import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import themeV2 from './theme';

const styles = {
  root: {
    fontFamily: themeV2.typography.fontFamily,
    color: themeV2.palette.darkText,
  },
  adminRoot: {
    fontFamily: themeV2.typography.adminFontFamily,
    color: themeV2.palette.darkText,
  },
};

function getFontWeight(weight) {
  switch (weight) {
    case 'bold':
      return themeV2.typography.fontWeightBold;
    case 'medium':
      return themeV2.typography.fontWeightMedium;
    case 'semiBold':
      return themeV2.typography.fontWeightSemibold;
    default:
      return themeV2.typography.fontWeightRegular;
  }
}

function CustomTypography(props) {
  const { classes, children, weight, style, className, ...rest } = props;
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <Typography
      className={classNames(classes.root, className)}
      style={{ ...style, fontWeight: getFontWeight(weight) }}
      {...rest}
    >
      {children}
    </Typography>
  );
}

function AdminTypographyComponent(props) {
  const { classes, children, weight, style, className, ...rest } = props;
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <Typography
      className={classNames(classes.adminRoot, className)}
      style={{ ...style, fontWeight: getFontWeight(weight) }}
      {...rest}
    >
      {children}
    </Typography>
  );
}
export const AdminTypography = withStyles(styles)(AdminTypographyComponent);

CustomTypography.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  weight: PropTypes.string,
  style: PropTypes.object,
};

CustomTypography.defaultProps = {
  weight: 'Regular',
  style: {},
};

export default withStyles(styles)(CustomTypography);
