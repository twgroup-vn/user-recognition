import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { CssBaseline } from '@material-ui/core';

// const muiTheme = getMuiTheme({
//   
// });


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
        '&:focus': {
          outline: 'none',
        },
      },
      containedPrimary: {
        color: '#FFF',
        minWidth: 80,
        backgroundColor: '#FF4400',
        '&:hover': {
          color: '#FFF',
        },
      },
      containedSecondary: {
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
    fontSize: 14,
    htmlFontSize: 16,
    fontFamily: ['"Roboto"', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
