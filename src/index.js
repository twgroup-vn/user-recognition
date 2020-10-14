import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import StoreProvider from './store/StoreContext';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { CssBaseline } from '@material-ui/core';
import ThemeV2 from './components/V2/theme';

const theme = createMuiTheme({
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
            root: {
                color: 'rgb(0,0,0,0.38)',
            },
        },
        MuiInput: {
            root: {
                fontSize: '1rem',
            },
            underline: {
                '&:after': {
                    borderBottom: `2px solid ${ThemeV2.palette.primary.main}`,
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
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightSemibold: 500,
        fontWeightBold: 600,
        fontSize: 16,
        htmlFontSize: 16,
        fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
    }
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
