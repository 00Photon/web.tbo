import React, { useEffect, useRef } from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// ** Custom Component Imports
import StyledImage from "@/@core/component/mui/image";

// * Image Imports
import Bitmap from "../assets/Bitmap.svg";
import bars from "../assets/bars.svg";
import cheerful from "../assets/cheerful.svg";

// ** MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

// ** Animation Import
import anime from "animejs";

// Styled components for better visual elements
const GradientTypography = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.common.white}, ${alpha(theme.palette.common.white, 0.7)})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.1)}, ${alpha(theme.palette.common.white, 0.05)})`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: "0.75rem 2rem",
  borderRadius: "30px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: `0 10px 20px ${alpha("#A20514", 0.3)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 15px 25px ${alpha("#A20514", 0.4)}`,
  },
}));

const TalentBanner: React.FC = () => {
  const theme = useTheme();
  const floatingElement1 = useRef<HTMLDivElement>(null);
  const floatingElement2 = useRef<HTMLDivElement>(null);
  const floatingElement3 = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation for floating elements
    anime({
      targets: floatingElement1.current,
      translateY: ["-10px", "10px"],
      opacity: [0.5, 0.8],
      duration: 4000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
    
    anime({
      targets: floatingElement2.current,
      translateX: ["-15px", "15px"],
      opacity: [0.3, 0.6],
      duration: 5000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
    
    anime({
      targets: floatingElement3.current,
      scale: [0.9, 1.1],
      opacity: [0.2, 0.5],
      duration: 6000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
    
    // Image entrance animation
    anime({
      targets: imageRef.current,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        overflow: "hidden",
        background: "linear-gradient(135deg, #A20514, #500A12)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          overflow: "hidden",
          maxWidth: "1440px",
          mx: "auto",
          pt: { xs: 4, md: 0 },
          pb: { xs: 6, md: 0 },
        }}
      >
        {/* Background elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Bitmap.src})`,
            backgroundSize: "cover",
            opacity: 0.2,
            zIndex: 1,
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            top: { xs: "10%", md: 0 },
            left: { xs: -30, md: 0 },
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bars.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: { xs: "50%", md: "20%" },
            opacity: 0.3,
            zIndex: 1,
          }}
        />
        
        {/* Floating decoration elements */}
        <FloatingElement
          ref={floatingElement1}
          sx={{
            width: { xs: 100, md: 150 },
            height: { xs: 100, md: 150 },
            top: "20%",
            left: "5%",
            zIndex: 1,
          }}
        />
        
        <FloatingElement
          ref={floatingElement2}
          sx={{
            width: { xs: 80, md: 120 },
            height: { xs: 80, md: 120 },
            bottom: "15%",
            right: "15%",
            zIndex: 1,
          }}
        />
        
        <FloatingElement
          ref={floatingElement3}
          sx={{
            width: { xs: 60, md: 100 },
            height: { xs: 60, md: 100 },
            top: "10%",
            right: "30%",
            zIndex: 1,
          }}
        />

        {/* Content sections */}
        <Box
          sx={{
            flex: { xs: "0 0 100%", md: "0 0 50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            px: { xs: 3, sm: 6, md: 8 },
            py: { xs: 4, md: 8 },
            zIndex: 2,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Chip
            label="CAREER OPPORTUNITIES"
            sx={{
              bgcolor: alpha(theme.palette.common.white, 0.1),
              color: theme.palette.common.white,
              fontWeight: 500,
              mb: 3,
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
          
          <Typography
            variant="h6"
            sx={{
              color: alpha(theme.palette.common.white, 0.9),
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: 400,
              mb: 2,
              letterSpacing: "0.5px",
            }}
          >
            Job Hunting Made Simple
          </Typography>
          
          <GradientTypography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
              mb: 4,
            }}
          >
            Are You Looking For Your Next Career Move?
          </GradientTypography>
{/*           
          <Typography
            variant="body1"
            sx={{
              color: alpha(theme.palette.common.white, 0.8),
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: "500px",
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            Connect with top employers and opportunities that match your skills. With thousands of job seekers successfully placed, we've got your career advancement covered!
          </Typography> */}

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <ActionButton
              variant="contained"
              sx={{
                background: "#A20514",
                minWidth: { xs: "200px", sm: "auto" },
              }}
            >
              Get Started
              <Icon 
                icon="material-symbols-light:arrow-right-alt-rounded" 
                fontSize={24} 
                style={{ marginLeft: '8px' }} 
              />
            </ActionButton>
            
            <Button
              variant="text"
              sx={{
                color: theme.palette.common.white,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "1rem",
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.05),
                }
              }}
            >
              <Icon 
                icon="material-symbols:play-circle-outline" 
                fontSize={24} 
                style={{ marginRight: '8px' }} 
              />
              Watch How It Works
            </Button>
          </Box>
          
          <Box 
            sx={{ 
              display: "flex", 
              gap: 1, 
              mt: 5,
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ color: alpha(theme.palette.common.white, 0.7) }}
            >
              Trusted by:
            </Typography>
            
            {[1, 2, 3].map((_, index) => (
              <Box 
                key={index}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: theme.palette.common.white, fontWeight: 600 }}>
                  C{index + 1}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          ref={imageRef}
          sx={{
            flex: { xs: "0 0 100%", md: "0 0 50%" },
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 4, md: 0 },
            py: { xs: 0, md: 6 },
            zIndex: 2,
          }}
        >
          {/* Glowing background effect for image */}
          <Box 
            sx={{
              position: "absolute",
              width: { xs: "70%", md: "80%" },
              height: { xs: "70%", md: "80%" },
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              borderRadius: "50%",
              filter: "blur(30px)",
              zIndex: -1,
            }}
          />
          
          <StyledImage
            src={cheerful.src}
            alt="A happy professional with laptop"
            sx={{
              width: { xs: "80%", md: "90%" },
              maxWidth: 500,
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
              transition: "transform 0.3s ease",
              '&:hover': {
                transform: "scale(1.02)",
              }
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default TalentBanner;