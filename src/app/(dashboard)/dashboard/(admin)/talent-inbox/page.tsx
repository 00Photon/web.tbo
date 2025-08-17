"use client"

import { useState } from "react"
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
} from "@mui/material"
import {
  Search as SearchIcon,
  Star as StarIcon,
  Send as SendIcon,
  Attachment as AttachmentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { conversationData } from "@/@core/component/data/message-data"
import type { ConversationData } from "@/@core/component/data/message-data"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationData | null>(conversationData[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversationData.filter(
    (conversation) =>
      conversation.talentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Here you would add the new message to the conversation
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Main Content - Fixed height container */}
      <Box sx={{ display: "flex", height: "calc(100vh - 140px)", gap: 3 }}>
        {/* Conversations List - Left Panel */}
        <Box sx={{ width: 400, minWidth: 350 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Search Header */}
            <CardContent sx={{ p: 3, pb: 2 }}>
              <TextField
                placeholder="Search talents or jobs..."
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

            {/* Conversations List */}
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <List sx={{ p: 0 }}>
                {filteredConversations.map((conversation) => {
                  const isSelected = selectedConversation?.id === conversation.id
                  const talent = conversation.participants.find((p) => p.role === "Talent")

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
                                backgroundColor: talent?.isOnline ? "#44b700" : "#bdbdbd",
                                color: talent?.isOnline ? "#44b700" : "#bdbdbd",
                                width: 12,
                                height: 12,
                                border: "2px solid white",
                              },
                            }}
                          >
                            <Avatar src={conversation.talentAvatar} sx={{ width: 48, height: 48 }}>
                              {conversation.talentName[0]}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>

                        {/* Custom ListItemText to avoid nested p tags */}
                        <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
                          {/* Primary text with time */}
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
                              {conversation.talentName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                              {conversation.lastMessageTime}
                            </Typography>
                          </Box>

                          {/* Secondary text with job title and unread count */}
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
                              {conversation.jobTitle}
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

                          {/* Last message preview */}
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
                  )
                })}
              </List>
            </Box>
          </Card>
        </Box>

        {/* Chat Area - Right Panel */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 3, borderBottom: "1px solid #E5E7EB" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: selectedConversation.participants.find((p) => p.role === "Talent")
                              ?.isOnline
                              ? "#44b700"
                              : "#bdbdbd",
                            color: selectedConversation.participants.find((p) => p.role === "Talent")?.isOnline
                              ? "#44b700"
                              : "#bdbdbd",
                            width: 12,
                            height: 12,
                            border: "2px solid white",
                          },
                        }}
                      >
                        <Avatar src={selectedConversation.talentAvatar} sx={{ width: 48, height: 48 }}>
                          {selectedConversation.talentName[0]}
                        </Avatar>
                      </Badge>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {selectedConversation.talentName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedConversation.jobTitle} •{" "}
                          {selectedConversation.participants.find((p) => p.role === "Talent")?.isOnline
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

                {/* Messages Area */}
                <Box sx={{ flex: 1, overflow: "auto", p: 3, bgcolor: "#FAFAFA" }}>
                  {selectedConversation.messages.map((message, index) => {
                    const isOwnMessage = message.senderName === "TBO Admin"
                    const showDate =
                      index === 0 ||
                      formatDate(message.timestamp) !== formatDate(selectedConversation.messages[index - 1].timestamp)

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
                    )
                  })}
                </Box>

                {/* Message Input */}
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
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <IconButton sx={{ mb: 0.5 }}>
                      <AttachmentIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
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
  )
}
