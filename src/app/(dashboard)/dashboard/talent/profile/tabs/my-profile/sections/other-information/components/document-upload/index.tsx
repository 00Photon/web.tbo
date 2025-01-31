import DocumentPreviewModal from "@/app/(dashboard)/dashboard/talent/profile/components/document-preview";
import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { uploadDocument } from "@/@core/services/profileService";

const DocumentUpload: React.FC<{ label: string }> = ({ label }) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setOpenPreviewModal(true); 
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadDocument(selectedFile, label);
        console.log("File uploaded successfully!");
        setOpenPreviewModal(false); 
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            color: "#101928",
            fontSize: "12px",
            fontWeight: 600,
            marginBottom: "5px",
          }}
        >
          {label}
        </Box>
        <Box
          sx={{
            border: "1px dashed #D0D5DD",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            rowGap: 3,
            textAlign: "center",
          }}
        >
          <Image
            src="/icons/cloud_upload.svg"
            width={56}
            height={56}
            alt="Cloud Upload Icon"
          />
          <Box>
            <Typography sx={{ fontSize: "13px" }}>
              <span style={{ color: "#E61C31", fontWeight: 600 }}>
                Click to upload
              </span>{" "}
              or drag and drop
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>
              {"SVG, PNG, JPG or GIF (max. 800x400px)"}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "11px" }}>OR</Typography>
          <Button
            onClick={() => setOpenPreviewModal(true)}
            variant="contained"
            sx={{ textTransform: "none", fontSize: "13px", fontWeight: 500 }}
          >
            Browse Files
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.gif,.svg"
            />
          </Button>
        </Box>
      </Box>
      <DocumentPreviewModal
        open={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        onSave={handleUpload}
        file={selectedFile}
      />
    </>
  );
};

export default DocumentUpload;
