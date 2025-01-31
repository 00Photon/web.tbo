import DocumentPreviewModal from "@/app/(dashboard)/dashboard/talent/profile/components/document-preview";
import { CloudUpload, Delete } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { uploadDocument } from "@/@core/services/profileService";

const DocumentUpload: React.FC<{ label: string }> = ({ label }) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null); // Track the uploaded file URL

  // Load the uploaded file URL from local storage on component mount
  useEffect(() => {
    const savedFileUrl = localStorage.getItem(`uploadedFileUrl_${label}`);
    if (savedFileUrl) {
      setUploadedFileUrl(savedFileUrl);
    }
  }, [label]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setOpenPreviewModal(true); // Open the preview modal
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const userId = 1; // Replace with the actual user ID
        await uploadDocument(userId, selectedFile, label);
        console.log("File uploaded successfully!");

        // Simulate a file URL after upload (replace with the actual URL from the API response)
        const fileUrl = URL.createObjectURL(selectedFile);
        setUploadedFileUrl(fileUrl); // Store the uploaded file URL
        console.log("File uploaded successfully!");

        setOpenPreviewModal(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Handle file deletion
  const handleDelete = () => {
    setUploadedFileUrl(null); // Clear the uploaded file URL
    localStorage.removeItem(`uploadedFileUrl_${label}`); // Remove from local storage
    setSelectedFile(null); // Clear the selected file
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
        {uploadedFileUrl ? (
          // Display the uploaded file preview
          <Box
            sx={{
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={uploadedFileUrl}
                alt="Uploaded Document"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                {selectedFile?.name}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={handleDelete}
              sx={{ textTransform: "none", fontSize: "13px" }}
            >
              Delete
            </Button>
          </Box>
        ) : (
          // Display the upload UI
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
              component="label" // Use a label to trigger file input
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
        )}
      </Box>
      <DocumentPreviewModal
        open={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        onSave={handleUpload} // Pass the upload function to the modal
        file={selectedFile}
      />
    </>
  );
};

export default DocumentUpload;
