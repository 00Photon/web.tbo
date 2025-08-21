"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Badge,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Star as StarIcon,
  Send as SendIcon,
  Attachment as AttachmentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { fetchMessages, sendMessage, getAdminRequests } from "@/@core/services/AdminPool";
import { getSession } from "next-auth/react";

export interface ConversationData {
  id: number;
  jobTitle: string;
  companyName: string;
  participants: { id: number; role: string; name: string; avatar?: string; isOnline: boolean }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: { id: number; senderName: string; senderAvatar?: string; content: string; timestamp: string; isStarred: boolean }[];
}

export interface Message {
  id: number;
  sender_id: number;
  sender_name: string;
  sender_role: string;
  receiver_id: number;
  message_text: string;
  sent_at: string;
  status: string;
}

export default function HirePage() {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<{ id: number; senderName: string; senderAvatar?: string; content: string; timestamp: string; isStarred: boolean }[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial conversations from admin requests
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const data = await getAdminRequests();
        const adminId = session?.user?.id;
        const adminConversations = data.requests.map((request) => ({
          id: request.id,
          jobTitle: request.job_title || "Untitled Job",
          companyName: request.client?.company_name || "Unknown Company",
          participants: [
            { id: request.client?.id || 0, role: "Company", name: request.client?.company_name || "Unknown", isOnline: false },
          ],
          lastMessage: request.messages?.[request.messages.length - 1]?.message_text || "No messages yet",
          lastMessageTime: request.messages?.[request.messages.length - 1]?.sent_at || "",
          unreadCount: request.messages?.filter((m) => m.receiver_id === adminId && !m.status.includes("read")).length || 0,
          messages: [],
        }));
        setConversations(adminConversations);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

useEffect(() => {
  let isMounted = true; // Flag to prevent state updates on unmounted component

  const fetchMessagesForConversation = async () => {
    if (selectedConversation) {
      setLoading(true);
      try {
        const session = await getSession();
        const adminId = session?.user?.id;
        const data = await fetchMessages(selectedConversation.id);
        if (isMounted) {
          const mappedMessages = data.messages
            .filter((msg) => msg.receiver_id === adminId) // Only messages sent to admin (from clients)
            .map((msg) => ({
              id: msg.id,
              senderName: msg.sender_role === "ADMIN" ? "You" : msg.sender_name,
              senderAvatar: msg.sender_role === "ADMIN" ? session?.user?.image ?? undefined : undefined, // Convert null to undefined
              content: msg.message_text,
              timestamp: msg.sent_at,
              isStarred: false,
            }));
          setMessages(mappedMessages);
          setSelectedConversation((prev) => prev ? { ...prev, messages: mappedMessages } : prev);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
  };

  fetchMessagesForConversation();

  // Cleanup function to prevent state updates after unmount
  return () => {
    isMounted = false;
  };
}, [selectedConversation?.id]); // Only re-run when selectedConversation.id changes
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConversation) {
      setLoading(true);
      try {
        const session = await getSession();
        const senderId = session?.user?.id;
        const receiverId = selectedConversation.participants.find((p) => p.role === "Company")?.id || 1; // Client ID
        await sendMessage(selectedConversation.id, receiverId, newMessage);
        const data = await fetchMessages(selectedConversation.id);
        const newMsg = data.messages.find((msg) => msg.sender_id === senderId && msg.message_text === newMessage);
        if (newMsg) {
          const mappedNewMsg = {
            id: newMsg.id,
            senderName: "You",
            senderAvatar: session?.user?.image ?? undefined, // Convert null to undefined
            content: newMsg.message_text,
            timestamp: newMsg.sent_at,
            isStarred: false,
          };
          setMessages((prev) => [...prev, mappedNewMsg]);
          setNewMessage("");
          setSelectedConversation((prev) => prev ? { ...prev, messages: [...prev.messages, mappedNewMsg], lastMessage: newMsg.message_text, lastMessageTime: newMsg.sent_at } : prev);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    else if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    else return date.toLocaleDateString();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Hiring
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage hiring conversations and communications
        </Typography>
      </Box>

      <Box sx={{ display: "flex", height: "calc(100vh - 200px)", gap: 3 }}>
        <Box sx={{ width: 400, minWidth: 350 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 3, pb: 2 }}>
              <TextField
                placeholder="Search jobs or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>

            <Divider />

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <List sx={{ p: 0 }}>
                {filteredConversations.map((conversation) => {
                  const isSelected = selectedConversation?.id === conversation.id;
                  const company = conversation.participants.find((p) => p.role === "Company");

                  return (
                    <ListItem key={conversation.id} sx={{ p: 0 }}>
                      <ListItemButton
                        onClick={() => setSelectedConversation(conversation)}
                        sx={{
                          p: 3,
                          bgcolor: isSelected ? "action.selected" : "transparent",
                          borderLeft: isSelected ? "3px solid" : "3px solid transparent",
                          borderLeftColor: isSelected ? "primary.main" : "transparent",
                          "&:hover": {
                            bgcolor: isSelected ? "action.selected" : "action.hover",
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                            sx={{
                              "& .MuiBadge-badge": {
                                backgroundColor: company?.isOnline ? "#44b700" : "#bdbdbd",
                                color: company?.isOnline ? "#44b700" : "#bdbdbd",
                                width: 12,
                                height: 12,
                                border: "2px solid white",
                              },
                            }}
                          >
                            <Avatar src={company?.avatar} sx={{ width: 48, height: 48 }}>
                              {conversation.jobTitle[0]}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>

                        <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: conversation.unreadCount > 0 ? 600 : 500,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                                mr: 1,
                              }}
                            >
                              {conversation.jobTitle}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                              {conversation.lastMessageTime}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                                mr: 1,
                                fontSize: "0.75rem",
                                fontWeight: 500,
                              }}
                            >
                              {conversation.companyName}
                            </Typography>
                            {conversation.unreadCount > 0 && (
                              <Chip
                                label={conversation.unreadCount}
                                size="small"
                                sx={{
                                  bgcolor: "primary.main",
                                  color: "white",
                                  fontSize: "0.75rem",
                                  height: 22,
                                  minWidth: 22,
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontSize: "0.75rem",
                            }}
                          >
                            {conversation.lastMessage}
                          </Typography>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {selectedConversation ? (
              <>
                <Box sx={{ p: 3, borderBottom: "1px solid #E5E7EB" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: selectedConversation.participants.find((p) => p.role === "Company")
                              ?.isOnline
                              ? "#44b700"
                              : "#bdbdbd",
                            color: selectedConversation.participants.find((p) => p.role === "Company")?.isOnline
                              ? "#44b700"
                              : "#bdbdbd",
                            width: 12,
                            height: 12,
                            border: "2px solid white",
                          },
                        }}
                      >
                        <Avatar
                          src={selectedConversation.participants.find((p) => p.role === "Company")?.avatar}
                          sx={{ width: 48, height: 48 }}
                        >
                          {selectedConversation.jobTitle[0]}
                        </Avatar>
                      </Badge>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {selectedConversation.jobTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedConversation.companyName} •{" "}
                          {selectedConversation.participants.find((p) => p.role === "Company")?.isOnline
                            ? "Online"
                            : "Offline"}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ flex: 1, overflow: "auto", p: 3, bgcolor: "#FAFAFA" }}>
                  {messages.map((message, index) => {
                    const isOwnMessage = message.senderName === "You";
                    const showDate =
                      index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

                    return (
                      <Box key={message.id}>
                        {showDate && (
                          <Box sx={{ textAlign: "center", my: 3 }}>
                            <Chip
                              label={formatDate(message.timestamp)}
                              size="small"
                              sx={{
                                bgcolor: "white",
                                color: "text.secondary",
                                fontSize: "0.75rem",
                              }}
                            />
                          </Box>
                        )}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: isOwnMessage ? "flex-end" : "flex-start",
                            mb: 2,
                          }}
                        >
                          <Box sx={{ maxWidth: "75%" }}>
                            {!isOwnMessage && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, ml: 1 }}>
                                <Avatar sx={{ width: 24, height: 24 }} src={message.senderAvatar}>
                                  {message.senderName[0]}
                                </Avatar>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                  {message.senderName}
                                </Typography>
                              </Box>
                            )}
                            <Paper
                              elevation={1}
                              sx={{
                                p: 2.5,
                                bgcolor: isOwnMessage ? "primary.main" : "white",
                                color: isOwnMessage ? "white" : "text.primary",
                                borderRadius: 3,
                                borderTopRightRadius: isOwnMessage ? 1 : 3,
                                borderTopLeftRadius: isOwnMessage ? 3 : 1,
                                position: "relative",
                              }}
                            >
                              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                {message.content}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mt: 1,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: isOwnMessage ? "rgba(255,255,255,0.8)" : "text.secondary",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {formatTime(message.timestamp)}
                                </Typography>
                                {message.isStarred && (
                                  <StarIcon
                                    sx={{
                                      fontSize: 16,
                                      color: isOwnMessage ? "rgba(255,255,255,0.8)" : "primary.main",
                                    }}
                                  />
                                )}
                              </Box>
                            </Paper>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                <Box sx={{ p: 3, borderTop: "1px solid #E5E7EB", bgcolor: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                    <TextField
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      size="small"
                      fullWidth
                      multiline
                      maxRows={4}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#F5F5F5",
                        },
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <IconButton sx={{ mb: 0.5 }}>
                      <AttachmentIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || loading}
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        mb: 0.5,
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                        "&:disabled": {
                          bgcolor: "grey.300",
                          color: "grey.500",
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  p: 4,
                }}
              >
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Select a conversation to start messaging
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", maxWidth: 400 }}>
                  Choose from your existing conversations on the left to view messages and continue the discussion
                </Typography>
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
