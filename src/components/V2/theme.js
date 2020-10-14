const LIGHT = 300;
const REGULAR = 400;
const MEDIUM = 500;
const SEMIBOLD = 600;
const BOLD = 700;

export default {
    palette: {
        blue: {
            60: '#014CDA'
        },
        primary: {
            main: '#FF4400',
        },
        secondary: {
            main: '#0AD71C',
        },
        gray: {
            0: '#F4F5F6',
            10: '#DBDDE0',
            20: '#C3C6CB'
        },
        white: {
            0: '#FFFFFF'
        }
    },
    typography: {
        fontWeightLight: LIGHT,
        fontWeightRegular: REGULAR,
        fontWeightMedium: MEDIUM,
        fontWeightSemibold: SEMIBOLD,
        fontWeightBold: BOLD
    },
    breakPoints: {
        lg: '1199.98px', // Large devices (desktops)
        md: '991.98px', // Medium devices (tablets)
        sm: '767.98px', // Small devices (landscape phones)
        xs: '575.98px', // Extra small devices (portrait phones)
    },
    animations: {
        AdminMain: {
          prop: {
            opacity: 0,
            y: 20,
          },
          duration: 0.3,
          stagger: 0.1,
        },
    },
}