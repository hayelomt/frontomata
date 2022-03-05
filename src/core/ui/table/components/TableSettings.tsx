import * as React from 'react';
import Settings from '@mui/icons-material/Settings';
import {
  Checkbox,
  FormControlLabel,
  Box,
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
  MenuList,
  Typography,
  Divider,
  Switch,
} from '@mui/material';
import { TableHeader } from '../tableTypes';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

type TableSettingsProps = {
  tableHeaders: TableHeader[];
  fieldVisible: Record<string, boolean>;
  toggleFieldVisibility: (field: string) => void;
  tableDense: boolean;
  toggleTableDensity: (field: boolean) => void;
};

const TableSettings: React.FC<TableSettingsProps> = ({
  fieldVisible,
  tableHeaders,
  toggleFieldVisibility,
  tableDense,
  toggleTableDensity,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              border: '1px solid',
              borderColor: 'grey.500',
              borderRadius: '5px',
              height: '25px',
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Settings sx={{ fontSize: '18px' }} />
            {open ? (
              <KeyboardArrowUp sx={{ fontSize: '18px' }} />
            ) : (
              <KeyboardArrowDown sx={{ fontSize: '18px' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            px: 2,
            mt: 1.5,
            maxHeight: '350px',
            overflowY: 'auto',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography fontSize="13px" fontWeight={600}>
          Configure
        </Typography>
        <Divider sx={{ mb: 0 }} />

        <FormControlLabel
          control={
            <Switch
              checked={tableDense}
              onChange={(e) => toggleTableDensity(e.target.checked)}
              size="small"
            />
          }
          componentsProps={{
            typography: { fontSize: '13px', fontWeight: '500' },
          }}
          label="Dense Table"
        />

        <Typography fontSize="13px" fontWeight={600} sx={{ mt: 1 }}>
          Displayed Fields
        </Typography>
        <Divider />
        <MenuList dense sx={{ mt: 0, pt: 0 }}>
          {tableHeaders.map((header, i) => (
            <MenuItem key={`visibility${i}`} sx={{ p: 0, height: '6px' }}>
              <FormControlLabel
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFieldVisibility(header.field);
                }}
                control={
                  <Checkbox size="small" checked={fieldVisible[header.field]} />
                }
                componentsProps={{
                  typography: { fontSize: '13px' },
                }}
                label={header.label}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </React.Fragment>
  );
};

export default TableSettings;
