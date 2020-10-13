import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import StoreProvider from './store/StoreContext';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { CssBaseline } from '@material-ui/core';

const LIGHT = 300;
const REGULAR = 400;
const SEMIBOLD = 500;
const BOLD = 600;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF4400',
    },
    secondary: {
      main: '#0AD71C',
    },
    text: {
      main: 'red',
    },
  },
  props: {
    MuiDialogTitle: {
      disableTypography: true,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        button: {
          '&:focus': {
            outline: 'none !important',
          },
        },
        body: {
          backgroundColor: '#f6f6f6',
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:focus': {
          outline: 'none !important',
        },
        padding: 4
      },
    },
    MuiFormLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: 'rgb(0,0,0,0.38)', // Some CSS
      },
    },
    MuiInput: {
      root: {
        fontSize: '1rem',
      },
      underline: {
        '&:after': {
          borderBottom: '2px solid #FF4400',
          transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },
        '&:before': {
          borderBottom: '1px solid rgb(224, 224, 224)',
        },
        '&:hover:before': {
          borderBottom: '1px solid rgb(224, 224, 224) !important',
        },
      },
    },
    MuiButton: {
      root: {
        boxShadow: 'none',
        '&:focus': {
            outline: 'none'
        },
      },
      containedPrimary: {
        boxShadow: 'none',
        color: '#FFF',
        minWidth: 80,
        backgroundColor: '#FF704C',
        '&:hover': {
          color: '#FFF',
          backgroundColor: '#FF9D78',
          boxShadow: 'none'
        },
        '&:focus': {
            backgroundColor: '#DB4C37'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        color: '#FFF',
        '&:hover': {
          color: '#FFF',
        },
      },
    },
    MuiDialogTitle: {
      root: {
        color: '#000',
        fontSize: 20,
        fontWeight: 500,
      },
    },
  },
  typography: {
    fontWeightLight: LIGHT,
    fontWeightRegular: REGULAR,
    fontWeightSemibold: SEMIBOLD,
    fontWeightBold: BOLD,
    fontSize: 16,
    htmlFontSize: 16,
    fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <StoreProvider>
                <App />
            </StoreProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
