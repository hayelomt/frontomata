import { Grid, Typography } from '@mui/material';
import { Media } from '../../utils/types';
import ToolTippedText from '../typography/ToolTippedText';
import DeleteAction from './DeleteAction';

type FileListItemProps = {
  media: Media;
  onDelete: () => Promise<void>;
};

const FileListItem = ({ onDelete, media }: FileListItemProps) => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        sx={{ mb: 1, borderBottom: '1px solid gray' }}
      >
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography>
            <ToolTippedText title={media.name} maxLength={15} />
          </Typography>
        </Grid>
        <Grid item>
          <DeleteAction
            message="Are you sure you want to delete file"
            onDelete={onDelete}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FileListItem;
