// * React Imports
import React, { useRef, useEffect } from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// * anime Import
import anime from "animejs";

// * Image Imports
import Bitmap from "../assets/Bitmap.svg";
import ImageThree from "../assets/imageThree.svg";
import GroupedImages from "../assets/groupImages.svg";
import Gears from "../assets/gears.svg";
import Star from "../assets/star.svg";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//** Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";
import ButtonStyled from "@/@core/component/mui/buttonStyled";
import StyledImage from "@/@core/component/mui/image";

// * MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha } from "@mui/material/styles";
import { jobSearchSchema } from "@/@core/formSchema";

interface Defaults {
  title?: string;
  location?: string;
}

const defaultValues: Defaults = {
  title: "",
  location: "",
};

const TalentHero = () => {
  const starRef = useRef<HTMLDivElement>(null);
  const AvatarRef = useRef<HTMLDivElement>(null);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(jobSearchSchema),
  });

  useEffect(() => {
    anime({
      targets: starRef.current,
      rotate: 360,
      duration: 3000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });

    anime({
      targets: AvatarRef.current,
      translateY: 10,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: { xs: "80dvh", md: "100dvh" },
        background: (theme) =>
          `linear-gradient(to right, ${alpha(
            theme.palette.primary.light,
            0.3
          )}, ${alpha(theme.palette.primary.light, 0.8)})`,
        textAlign: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "center", sm: "center" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${Bitmap.src})`,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "3%", sm: "20%" },
          left: "80%",
          width: "90%",
          height: "90%",
          backgroundImage: `url(${Gears.src})`,
          backgroundRepeat: "no-repeat",
        }}
      ></Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pb: 4,
          mt: { xs: 4, sm: 2 },
        }}
      >
        <Box sx={{ color: "#000", fontWeight: 600 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 2 }}
          >
            Connect with Top Employers
          </Typography>
          <Typography sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
            Unlock new levels of professional growth and development.
          </Typography>

          <Box
            sx={{
              mt: (theme) => theme.spacing(4),
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <ButtonStyled
              variant="contained"
              size="medium"
              sx={{
                p: {
                  xs: "0.5rem 1rem",
                  md: "0.75rem 1.5rem",
                },
                background: "#A20514",
              }}
            >
              Explore Jobs
              <Icon icon="material-symbols-light:arrow-right-alt-rounded" />
            </ButtonStyled>
          </Box>
        </Box>

        {/* Here */}
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", sm: "flex" },
            width: "50%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Box
            ref={AvatarRef}
            sx={{
              position: "absolute",
              top: "5%",
              left: "25%",
            }}
          >
            <StyledImage src={GroupedImages.src} />
          </Box>

          <Box
            ref={starRef}
            sx={{
              position: "absolute",
              top: "5%",
              left: "82%",
            }}
          >
            <StyledImage src={Star.src} />
          </Box>
          <Box>
            <StyledImage src={ImageThree.src} />
          </Box>
        </Box>
      </Box>

      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          width: { xs: "100%", sm: "85%" },
          height: { xs: "auto", lg: "30%" },
          position: "absolute",
          left: { xs: "0", sm: "7.5%" },
          top: "90%",
          borderRadius: 3,
          background: (theme) => theme.palette.secondary.light,
          boxShadow: (theme) => `${alpha(theme.palette.primary.dark, 0.4)}`,
          p: (theme) => [
            `${theme.spacing(2)} !important`,
            `${theme.spacing(4)} !important`,
          ],
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: 2,
            p: 2,
            mt: 2,
            border: (theme) => `1px solid ${theme.palette.primary.dark}`,
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Grid container spacing={3} rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Job Title, Keywords, Company Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            color: (theme) => theme.palette.primary.main,
                          }}
                        >
                          <Icon icon="lets-icons:search-duotone" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Location"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            color: (theme) => theme.palette.primary.main,
                          }}
                        >
                          <Icon icon="hugeicons:location-04" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: { xs: 2, sm: 0 },
            }}
          >
            <ButtonStyled
              variant="contained"
              size="large"
              endIcon={<Icon icon="lets-icons:search-duotone" />}
              sx={{
                px: (theme) => [
                  `${theme.spacing(3)} !important`,
                  `${theme.spacing(3)} !important`,
                ],
                py: (theme) => [
                  `${theme.spacing(2)} !important`,
                  `${theme.spacing(2)} !important`,
                ],
                ml: { xs: 0, sm: 4 },
              }}
            >
              Search
            </ButtonStyled>
          </CardActions>
        </CardContent>

        <Box
          sx={{
            alignSelf: "flex-start",
            display: "flex",
            mt: 2,
            fontSize: { xs: 12, sm: 14 },
            color: (theme) => theme.palette.secondary.dark,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              fontSize: 14,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Popular:
          </Typography>
          Designer, Programming, Digital Marketing, Animation, Videography...
        </Box>
      </Card>
    </Box>
  );
};

export default TalentHero;
