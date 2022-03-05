import { Cancel, FileUpload, UploadFile } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useState } from 'react';

type FileActionProps = {
  onSubmit: (file: File) => Promise<boolean>;
  uploading: boolean;
  progress: number;
};

const FileActions = ({ onSubmit, uploading, progress }: FileActionProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (file && (await onSubmit(file!))) {
      setFile(null);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          {file ? (
            <>
              <Grid item xs={12}>
                <Typography>{file.name}</Typography>
              </Grid>
              {uploading && (
                <Grid container justifyContent="flex-start">
                  <Grid item xs={10}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{ my: '5px' }}
                    />
                  </Grid>
                </Grid>
              )}
              <Grid>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  <UploadFile />
                </IconButton>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => setFile(null)}
                  disabled={uploading}
                >
                  <Cancel />
                </IconButton>
              </Grid>
            </>
          ) : (
            <>
              <Grid item>Files</Grid>
              <Grid item>
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={(e) =>
                      setFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <Button
                    className="btn-choose"
                    variant="text"
                    component="span"
                    startIcon={<FileUpload />}
                  ></Button>
                </label>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default FileActions;
