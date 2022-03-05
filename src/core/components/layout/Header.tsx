/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DrawerMenu from './DrawerMenu';
// import MenuIcon from '../../../icons/MenuIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import MenuIcon from '../icons/MenuIcon';

type HeaderProps = {
  children: React.ReactChild;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));

  useScrollPosition(({ prevPos, currPos }) => {
    // setPosY(currPos.y);
  });

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (matchesLg) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [matchesLg, location]);

  return (
    <div>
      <Box display="flex">
        <AnimatePresence>
          {openMenu && !matchesLg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              css={css`
                position: fixed;
                inset: 0;

                z-index: 1300;
              `}
            ></motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(openMenu || matchesLg) && (
            <motion.header>
              <DrawerMenu toggleMenu={toggleMenu} matchesLg={matchesLg} />
            </motion.header>
          )}
        </AnimatePresence>

        <div
          css={css`
            position: relative;
            display: grid;
            width: 100%;
          `}
        >
          <Box
            component={'nav'}
            sx={{
              position: 'fixed',
              left: { xs: 0, lg: '280px' },
              width: { xs: '100vw', lg: 'calc(100vw - 280px)' },
              zIndex: 1200,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',

                py: {
                  xs: '18px',
                  lg: '32px',
                },

                px: {
                  xs: '24px',
                  sm: '32px',
                },
              }}
            >
              {/* <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    posY < -150 || !isHomePage ? 'transparent ' : 'transparent',
                  backdropFilter:
                    posY < -150 || !isHomePage ? 'blur(6px)' : 'none',
                  zIndex: -1,
                  transition: 'background 0.4s',
                }}
              ></Box> */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {!matchesLg && (
                  <span
                    onClick={toggleMenu}
                    css={css`
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                    `}
                  >
                    <MenuIcon
                      sx={{
                        height: {
                          xs: '24px',
                          sm: '26px',
                        },
                        width: {
                          xs: '24px',
                          sm: '26px',
                        },
                      }}
                    />
                  </span>
                )}
              </Box>
            </Box>
          </Box>

          <main>
            <Box sx={{ pb: '129px', pt: 5, px: 2 }}>{children}</Box>
          </main>
        </div>
      </Box>
    </div>
  );
};

export default Header;
