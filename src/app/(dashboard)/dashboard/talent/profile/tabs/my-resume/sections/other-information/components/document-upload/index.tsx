import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

interface DocumentUploadProps {
  label: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string;
  onRemove?: () => void;
  disabled?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  accept = 'application/pdf',
  onChange,
  previewUrl,
  onRemove,
  disabled,
}) => {
  // Check if the file is an image (common extensions)
  const isImage = previewUrl?.match(/\.(jpeg|jpg|gif|png|svg|webp|bmp)$/i);
  
  // Check if the file is a PDF
  const isPDF = previewUrl?.match(/\.pdf$/i) || accept.includes('pdf');
  
  // Extract file name from URL
  const fileName = previewUrl?.split('/').pop()?.split('?')[0] || 'uploaded file';

  return (
    <Box>
      <Typography sx={{ fontWeight: 600, fontSize: 12, mb: 1 }}>{label}</Typography>

      {previewUrl ? (
        <Box sx={{ mb: 1 }}>
          {/* Preview section */}
          <Box sx={{ 
            mb: 2, 
            border: '1px solid #eee', 
            p: 2, 
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 100,
            justifyContent: 'center'
          }}>
            {isImage ? (
              <img 
                src={previewUrl} 
                alt="Upload preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px',
                  display: 'block',
                }} 
              />
            ) : isPDF ? (
              <Box sx={{ textAlign: 'center' }}>
                <Image 
                  src="/images.png" // You'll need a PDF icon in your public folder
                  width={48} 
                  height={48} 
                  alt="PDF icon" 
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {fileName}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Image 
                  src="/icons/document-icon.svg" // You'll need a generic document icon
                  width={48} 
                  height={48} 
                  alt="Document icon" 
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {fileName}
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              component="a"
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textTransform: 'none' }}
            >
              {isImage ? 'View Image' : 'View Document'}
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              color="error" 
              onClick={onRemove}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            border: '1px dashed #D0D5DD',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            rowGap: 3,
            textAlign: 'center',
          }}
        >
          <Image src="/icons/cloud_upload.svg" width={56} height={56} alt="Cloud Upload Icon" />
          <Typography sx={{ fontSize: 13 }}>
            <span style={{ color: '#E61C31', fontWeight: 600 }}>Click to upload</span> or drag and drop
          </Typography>
          <Typography sx={{ fontSize: 11 }}>
            {accept.includes('image') ? 'PDF or Image (max. 10MB)' : 'PDF (max. 10MB)'}
          </Typography>
          <Button
            variant="contained"
            component="label"
            disabled={disabled}
            sx={{ textTransform: 'none', fontSize: 13, fontWeight: 500, mt: 1 }}
          >
            Browse Files
            <input type="file" accept={accept} onChange={onChange} hidden disabled={disabled} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DocumentUpload;