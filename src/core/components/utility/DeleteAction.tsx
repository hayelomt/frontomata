import { Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import Confirmation from '../dialog/Confirmation';

type DeleteProps = {
  onDelete: () => Promise<void>;
  message: string;
};

const DeleteAction = ({ onDelete, message }: DeleteProps) => {
  const [deleteEnabled, setEnabled] = useState(true);

  const handleDelete = async () => {
    setEnabled(false);
    await onDelete();
    setEnabled(true);
  };

  return (
    <>
      <Confirmation
        title="Confirm Deletion"
        message={message}
        onConfirm={handleDelete}
        buttonEnabled={deleteEnabled}
      >
        <Delete fontSize="small" sx={{ color: red[600], cursor: 'pointer' }} />
      </Confirmation>
    </>
  );
};

export default DeleteAction;
