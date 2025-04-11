import React, { useState } from "react";

// Icon Import
import Icon from "../../../@core/component/icon";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { styled, alpha } from "@mui/material/styles";
import PostJobModal from "../../../app/(default)/component/PostJobPopup"; // adjust path if different

type Talent = {
  id: number;
  name: string;
  skills: string[];
  hourlyRate: number;
  avatar: string;
  niche: string;
  rating: number;
  projectsCompleted: number;
  availability: string;
  coverImage: string;
};



// Sample talent data
const talents = [
  {
    id: 1,
    name: "Alexis Morgan",
    skills: ["UI Design", "Figma", "Adobe XD"],
    hourlyRate: 65,
    avatar: "/api/placeholder/80/80",
    niche: "Design",
    rating: 4.8,
    projectsCompleted: 32,
    availability: "Available Now",
    coverImage: "/api/placeholder/400/150"
  },
  {
    id: 2,
    name: "Michael Chen",
    skills: ["React", "Node.js", "MongoDB"],
    hourlyRate: 85,
    avatar: "/api/placeholder/80/80",
    niche: "Development",
    rating: 4.9,
    projectsCompleted: 47,
    availability: "Available in 2 weeks",
    coverImage: "/api/placeholder/400/150"
  },
  {
    id: 3,
    name: "Sophia Williams",
    skills: ["SEO", "Content Strategy", "Analytics"],
    hourlyRate: 55,
    avatar: "/api/placeholder/80/80",
    niche: "Marketing",
    rating: 4.6,
    projectsCompleted: 28,
    availability: "Available Now",
    coverImage: "/api/placeholder/400/150"
  },
  // ... other talents
];

// Styled components
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  minWidth: 0,
  padding: '10px 16px',
  borderRadius: '12px',
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const TalentCard = ({ talent, onClick } :any) => {
  const [hovered, setHovered] = useState(false);
  
  const isAvailableNow = talent.availability === "Available Now";
  
  return (
    <Card 
      onClick={() => onClick(talent.id)}
      sx={{ 
        borderRadius: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'none',
        boxShadow: hovered 
          ? '0 12px 24px rgba(0,0,0,0.12)' 
          : '0 4px 12px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        overflow: 'visible'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      
      <Box sx={{ position: 'relative', px: 3, mt: 1 }}>
        {isAvailableNow ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              src={talent.avatar}
              alt={talent.name}
              sx={{ 
                width: 72, 
                height: 72,
                border: '3px solid #fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            />
          </StyledBadge>
        ) : (
          <Avatar
            src={talent.avatar}
            alt={talent.name}
            sx={{ 
              width: 72, 
              height: 72,
              border: '3px solid #fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ pt: 2, px: 3, pb: 3 }}>
        <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 0.5,
                fontSize: '1.1rem',
                lineHeight: 1.2
              }}
            >
              {talent.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Chip 
                label={talent.niche} 
                size="small" 
                sx={{ 
                  borderRadius: '6px',
                  backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }} 
              />
              <Tooltip title={talent.availability}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    ml: 1,
                    color: isAvailableNow ? 'success.main' : 'text.secondary',
                    fontWeight: isAvailableNow ? 600 : 400
                  }}
                >
                  {isAvailableNow ? 'Available now' : 'Limited availability'}
                </Typography>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Rating 
                value={talent.rating} 
                precision={0.1} 
                readOnly 
                size="small" 
                sx={{ mr: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                {talent.rating} ({talent.projectsCompleted} projects)
              </Typography>
            </Box>
          </Box>
          
          <Typography 
            sx={{ 
              fontWeight: 700, 
              fontSize: '1.25rem',
              color: 'primary.main'
            }}
          >
            ${talent.hourlyRate}
            <Typography component="span" variant="caption" color="text.secondary">/hr</Typography>
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
          {talent.skills.map((skill : any, index : any) => (
            <Chip 
              key={index} 
              label={skill} 
              size="small" 
              variant="outlined"
              sx={{ 
                borderRadius: '6px',
                fontSize: '0.75rem'
              }} 
            />
          ))}
        </Box>
        
        <Button 
          variant="contained"
          fullWidth
          endIcon={<Icon icon="material-symbols:arrow-forward-rounded" />}
          sx={{ 
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: hovered ? '0 6px 12px rgba(0,0,0,0.15)' : '0 3px 6px rgba(0,0,0,0.1)',
            py: 1.25
          }}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

// App Router Version (for src/app directory structure)
const TalentGrid = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null | undefined>(null);
  const [hovered, setHovered] = useState(false);




  const handleTabChange = (event : any, newValue : any) => {
    setActiveTab(newValue);
  };

  const handleViewProfile = (talentId: number) => {
    const talent = talents.find(t => t.id === talentId);
    setSelectedTalent(talent);
    setModalOpen(true); // Open the modal instead of routing
  };
  
 
  

  const filteredTalents = activeTab === "all"
    ? talents
    : talents.filter(talent => talent.niche.toLowerCase() === activeTab);

    const niches = ['all', ...Array.from(new Set(talents.map(talent => talent.niche.toLowerCase())))];

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 4 },
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.25rem" },
            fontWeight: 700,
            mb: 2,
            mt: "20px",
          }}
        >
          Top Talent Showcase
        </Typography>

        <Typography 
          sx={{ 
            fontSize: { xs: "1rem", md: "1.125rem" },
            maxWidth: "800px",
            mx: "auto",
            color: "text.secondary",
            mb: 4
          }}
        >
          Find experts from various niches ready to work on your next project
        </Typography>
      </Box>

      {/* Filter tabs */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          mb: 4,
          '& .MuiTabs-flexContainer': {
            gap: 1
          },
          '& .MuiTabs-indicator': {
            display: 'none'
          }
        }}
      >
        {niches.map((niche) => (
          <StyledTab 
            key={niche} 
            label={niche.charAt(0).toUpperCase() + niche.slice(1)} 
            value={niche} 
          />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {filteredTalents.map((talent) => (
           <Grid item xs={12} sm={6} md={4} lg={3} key={talent.id}>
           <TalentCard talent={talent} onClick={handleViewProfile} />
         </Grid>
        ))}
      </Grid>
      
      {filteredTalents.length === 0 ? (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h6" color="text.secondary">
      No talents found in this category.
    </Typography>
    {/* You should probably handle this case separately. */}
  </Box>
) : (
  filteredTalents.map((talent) => (
    <Box key={talent.id} sx={{ textAlign: 'center', py: 8 }}>
      <Button
        variant="contained"
        fullWidth
        endIcon={<Icon icon="material-symbols:arrow-forward-rounded" />}
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: hovered ? '0 6px 12px rgba(0,0,0,0.15)' : '0 3px 6px rgba(0,0,0,0.1)',
          py: 1.25
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleViewProfile(talent.id); // Pass the correct talent's id
        }}
      >
        View Profile
      </Button>
    </Box>
  ))
)}

        <PostJobModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        talentName={selectedTalent?.name}
      />
    </Box>
    
  );
};

export default TalentGrid;