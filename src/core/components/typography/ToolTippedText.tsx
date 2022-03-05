import { Tooltip } from '@mui/material';

type ToolTippedProps = {
  maxLength: number;
  title: string;
};

const ToolTippedText = ({ title, maxLength }: ToolTippedProps) => {
  return (
    <>
      <Tooltip title={title}>
        <span>
          {title.length > maxLength ? title.substring(0, maxLength) : title}
        </span>
      </Tooltip>
    </>
  );
};

export default ToolTippedText;
