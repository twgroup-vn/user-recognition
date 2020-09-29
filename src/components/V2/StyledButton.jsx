import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import themeV2 from './theme';

const StyledButton = withStyles({
    contained: {
        height: 44,
        borderRadius: 10,
        backgroundColor: themeV2.palette.greenLight,
        color: themeV2.palette.white,
        '&:$disabled': {
            backgroundColor: `${themeV2.palette.drakGray2} !important`
        },
        '&:hover': {
            textDecoration: 'none',
            color: themeV2.palette.white,
            backgroundColor: themeV2.palette.green,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
            boxShadow: 'none !important',
        }   
    },
    containedPrimary: {
        backgroundColor: themeV2.palette.primary.main,
        color: themeV2.palette.white,
        '&:hover': {
          backgroundColor: darken(themeV2.palette.primary.main, 0.3),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: darken(themeV2.palette.primary.main, 0.3),
          },
        },
        boxShadow: 'none !important',
    },
    /* Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
    containedSecondary: {
        backgroundColor: themeV2.palette.secondary.main,
        color: themeV2.palette.white,
        '&:hover': {
        color: `${themeV2.palette.white} !important`,
        backgroundColor: darken(themeV2.palette.secondary.main, 0.3),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: darken(themeV2.palette.secondary.main, 0.3),
            },
        },
        boxShadow: 'none !important',
    },
    label: {
        textTransform: 'none',
        fontFamily: themeV2.typography.fontFamily,
        fontSize: 14,
        fontWeight: themeV2.typography.fontWeightMedium,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
    }
})(Button)

export default StyledButton