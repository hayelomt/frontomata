import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import Confirmation from '../dialog/Confirmation';

type DeleteProps = {
  onDelete: (e: React.MouseEvent<unknown>) => Promise<void>;
  message: string;
};

const DeleteAction = ({ onDelete, message }: DeleteProps) => {
  const [deleteEnabled, setEnabled] = useState(true);

  const handleDelete = async (e: React.MouseEvent<unknown>) => {
    setEnabled(false);
    await onDelete(e);
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
        <Delete sx={{ color: red[600], cursor: 'pointer', fontSize: '15px' }} />
      </Confirmation>
    </>
  );
};

export default DeleteAction;
