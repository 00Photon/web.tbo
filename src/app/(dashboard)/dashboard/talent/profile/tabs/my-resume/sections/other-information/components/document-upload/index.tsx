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
  return (
    <Box>
      <Typography sx={{ fontWeight: 600, fontSize: 12, mb: 1 }}>{label}</Typography>

      {previewUrl ? (
        <Box sx={{ mb: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            component="a"
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', mb: 1 }}
          >
            View uploaded file
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={onRemove}>
            Remove
          </Button>
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
          <Typography sx={{ fontSize: 11 }}>PDF or Image (max. 10MB)</Typography>
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
