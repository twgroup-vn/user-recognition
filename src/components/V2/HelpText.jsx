import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import ThemeV2 from './theme';

const styles = () => ({
    root: {
      fontFamily: ThemeV2.typography.fontFamily,
      fontWeight: ThemeV2.typography.fontWeightMedium,
      color: ThemeV2.palette.darkGray3,
      lineHeight: '15px',
      fontSize: '11px',
      '&.disabled': {
        opacity: '0.24',
        userSelect: 'none',
      },
      '&.error': {
        color: ThemeV2.palette.red2,
      },
    },
});
function HelperText(props) {
    const { classes, text, disabled, error, children, ...rest } = props;
    return (
        <FormHelperText
          className={classnames(
            classes.root,
            disabled ? 'disabled' : '',
            error ? 'error' : '',
          )}
          {...rest}
        >
          {children}
        </FormHelperText>
    )
}

export default withStyles(styles)(HelperText);