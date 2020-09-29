const LIGHT = 300;
const REGULAR = 400;
const MEDIUM = 500;
const SEMIBOLD = 600;
const BOLD = 700;

export default {
    palette: {
        primary: {
          main: '#FF4400',
        },
        secondary: {
          main: '#0AD71C',
        },
        /* Atomic Design Palette */
        cyan1: '#E6FFFB',
        cyan6: '#13C2C2',
        cyan7: '#08979C',
        gray1: '#FFFFFF',
        gray2: '#FAFAFA',
        gray3: '#F5F5F5',
        gray4: '#E8E8E8',
        gray5: '#D9D9D9',
        gray6: '#BFBFBF',
        gray7: '#8C8C8C',
        gray8: '#595959',
        gray9: '#262626',
        gray10: '#000000',
        athensGray: '#F7F7F9',
        mischka: '#E1E1E9',
        silver: '#C4C4C4',
        dustRed6: '#F5222D',
        dayBreakBlue2: '#BAE7FF',
        volcano6: '#FA541C',
        volcano7: '#D4380D',
        sunriseYellow6: '#FADB14',
        polarGreen6: '#52C41A',
        polarGreen7: '#389E0D',
        blue1: '#E6F7FF',
        blue7: '#096DD9',
        geekBlue1: '#F0F5FF',
        geekBlue2: '#F0F2F5',
        geekBlue3: '#ADC6FF',
        geekBlue5: '#597EF7',
        geekBlue6: '#2F54EB',
        geekBlue7: '#1D39C4',
        geekBlue8: '#10239E',
        gold1: '#FFFBE6',
        gold5: '#FFC53D',
        gold6: '#FAAD14',
        gold7: '#D48806',
        purple1: '#F9F0FF',
        purple7: '#531DAB',
        /* Atomic Design Palette */
    
        darkText: '#2C2C2C', //  '#4d4d4f',
        greenLight: '#44af69',
        genoa: '#178062',
        jetStream: '#B6D7CD',
        lightGray1: '#E2E2E2', // '#CCCCCC'
        lightGray2: '#E2E2E2',
        lightGray3: '#CACACA',
        lightGray4: '#D8D8D8',
        lightGray5: '#D9D9D9',
        lightGray6: '#BFBFBF',
        drakGray2: '#888888',
        darkGray3: '#9D9D9D',
        darkGray7: '#8C8C8C',
        fedora: '#727172',
        darkGray9: '#262626',
        alto: '#DDDDDD',
        thunder: '#212021',
        coffee: '#717274',
        paleSlate: '#C1C0C1',
        new: '#F7F7F9',
        white: '#ffffff',
        aqua: '#2292a4',
        aqua2: '#08979C',
        blue: '#00D0E8',
        blue2: '#4a90e2',
        green: '#09AC16',
        green1: '#F6FFED',
        green7: '#389E0D',
        orange6: '#FA8C16',
        brown: '#D46B08',
        azalea: '#F6C2D2',
        skyblue: '#00BBD1',
        red: '#FF6060',
        red1: '#FFF1F0',
        red2: '#FC5A5A',
        red6: '#F5222D',
        ceriseRed: '#DE245C',
        lightBlue: '#E7FCFF',
        white2: '#F9F9F9',
        white3: '#F6F6F6',
        white4: '#E5E5E5',
        yellow: '#E8C400',
        yellow2: '#D4B106',
        office365Logo: '#E64A19',
        inherit: 'inherit',
        action: {
          hoverOpacity: 0.1,
        },
    },
    typography: {
        fontWeightLight: LIGHT,
        fontWeightRegular: REGULAR,
        fontWeightMedium: MEDIUM,
        fontWeightSemibold: SEMIBOLD,
        fontWeightBold: BOLD,
        fontSize: 14,
        fontFamily: ['"Poppins"', 'sans-serif'].join(','),
        adminFontFamily: ['"Roboto"', 'sans-serif'].join(','),
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