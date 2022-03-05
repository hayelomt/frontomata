import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

type ConfirmationProps = {
  title: string;
  message: string;
  onConfirm: (e: React.MouseEvent<unknown>) => void | Promise<void>;
  buttonEnabled: boolean;
  children: React.ReactNode;
};

const Confirmation = ({
  title,
  message,
  onConfirm,
  buttonEnabled,
  children,
}: ConfirmationProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e: React.MouseEvent<unknown>) => {
    e.stopPropagation();
    await onConfirm(e);
    handleClose();
  };

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} disabled={!buttonEnabled}>
            {buttonEnabled ? 'Confirm' : 'Processing'}
          </Button>
          <Button onClick={handleClose} autoFocus disabled={!buttonEnabled}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Confirmation;
