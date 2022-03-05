import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import App from './core/containers/App';
import theme from './core/theme';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
