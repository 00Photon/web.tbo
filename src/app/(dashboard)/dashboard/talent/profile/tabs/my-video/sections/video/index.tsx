import { Box, Grid, TextField, Typography } from "@mui/material";

const VideoUploadSection = () => {
  return (
    <section>
      <Box>
        <Typography sx={{ fontWeight: 600, color: "#39353D", fontSize: "16px" }}>
          Upload Video URL of Yourself
        </Typography>
        <Typography sx={{ fontSize: "13px", mb: "10px" }}>
          Please provide a YouTube or Google Drive link.
        </Typography>
        <Grid container columnSpacing={4} rowSpacing={3}>
          <Grid item xs={12}>
            <Box sx={{ color: "#101928", fontSize: "12px", fontWeight: 500, marginBottom: "5px" }}>
              Video URL
            </Box>
            <TextField
              placeholder="Enter YouTube or Google Drive link"
              sx={{ width: "100%" }}
              inputProps={{ style: { fontSize: "12px" } }}
            />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default VideoUploadSection;
