/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { BackgroundColor, InactiveColor, PaperColor } from '../../theme/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DrawerMenuItem from './DrawerMenuItem';
import { motion } from 'framer-motion';
// import { useLocation } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import AuthContext from '../../../features/auth/service/authContext';

type DrawerMenuProps = {
  toggleMenu: () => void;
  matchesLg: boolean;
};

const DrawerMenu: React.FC<DrawerMenuProps> = (props) => {
  const { user, logoutUser } = useContext(AuthContext);
  const matchesLg = props.matchesLg;
  const location = useLocation();

  return (
    <ClickAwayListener onClickAway={props.toggleMenu}>
      <div>
        {matchesLg && (
          <Box
            component={motion.div}
            initial={{ marginLeft: matchesLg ? 0 : -400 }}
            animate={{ marginLeft: 0 }}
            exit={{ marginLeft: matchesLg ? 0 : -400 }}
            transition={{ duration: 0.3 }}
            sx={{ width: '280px', position: 'relative' }}
          ></Box>
        )}

        <Box
          component={motion.div}
          initial={{ marginLeft: matchesLg ? 0 : -400 }}
          animate={{ marginLeft: 0 }}
          exit={{ marginLeft: matchesLg ? 0 : -400 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: { xs: 'fixed' },
            width: '280px',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: BackgroundColor,
            zIndex: 1300,
            py: '32px',
          }}
        >
          {/* <Box sx={{ pl: '34px', position: 'relative' }}>
            <Link to="/"></Link>
          </Box> */}

          <Box
            sx={{
              // width: "100%",
              borderRadius: '8px',
              height: '76px',
              background: PaperColor,
              mt: '20px',
              mx: '34px',
              py: '16px',
              px: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Avatar />
            <Box>
              <Link
                to="/profile"
                css={css`
                  text-decoration: none;
                `}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '15px',
                    lineHeight: '22px',
                    color:
                      location.pathname === '/profile' ? '#1c65c4' : '#413c3c',
                  }}
                >
                  {user?.name}
                </Typography>
              </Link>

              <span onClick={logoutUser}>
                <Typography
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '22px',
                    // color: InactiveColor,

                    cursor: 'pointer',
                  }}
                >
                  Log out
                </Typography>
              </span>
            </Box>
          </Box>

          <Box
            component="ul"
            sx={{ mt: '28px', listStyle: 'none', p: 0, color: InactiveColor }}
          >
            <li>
              <Link
                to="/about"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="About"
                  active={location.pathname.startsWith('/about')}
                />
              </Link>
            </li>
            <hr style={{ marginBottom: '20px', marginTop: '20px' }} />
            <li>
              <Link
                to="/blogs"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="Blogs"
                  active={location.pathname.startsWith('/blogs')}
                />
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="Projects"
                  active={location.pathname.startsWith('/projects')}
                />
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="Jobs"
                  active={location.pathname.startsWith('/jobs')}
                />
              </Link>
            </li>
            <li>
              <Link
                to="/testimonies"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="Testimonies"
                  active={location.pathname.startsWith('/testimonies')}
                />
              </Link>
            </li>
            <hr style={{ marginBottom: '20px', marginTop: '20px' }} />
            <li>
              <Link
                to="/partnerships"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="Partnership"
                  active={location.pathname.startsWith('/partnerships')}
                />
              </Link>
            </li>
            <li>
              <Link
                to="/newsletters"
                css={css`
                  text-decoration: none;
                `}
              >
                <DrawerMenuItem
                  label="Newsletter"
                  active={location.pathname.startsWith('/newsletters')}
                />
              </Link>
            </li>
          </Box>
        </Box>
      </div>
    </ClickAwayListener>
  );
};

export default DrawerMenu;
