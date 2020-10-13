import React , { useMemo } from 'react';
import { oneOf, string, bool, oneOfType, node, arrayOf, object, array } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import ThemeV2 from '../V2/theme';

const variantMap = {
    body2: {
        fontWeight: ThemeV2.typography.fontWeightRegular,
    },
    body2SemiBold: {
        fontWeight: ThemeV2.typography.fontWeightSemibold,
    },
    body2Bold: {
        fontWeight: ThemeV2.typography.fontWeightBold,
    },
    body2Medium: {
        fontWeight: ThemeV2.typography.fontWeightMedium,
    },
}

const useStyles = makeStyles({
    root: ({
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        lineHeight,
        color,
    }) => ({
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        lineHeight,
        color,
    }),
})

const Body = ({
    children,
    className: parentClassName,
    variant,
    fontFamily,
    color,
    inline,
    disabled,
    style,
    'data-testid': dataTestId
}) => {
    const fontColor = disabled ? 'gray6' : color;
    const variantFromMap = variantMap[variant];
    const { fontSize, fontWeight, fontStyle, lineHeight } = variantFromMap;
    const paletteColor = ThemeV2.palette[fontColor];
    const bodyStyle = useMemo(
        () => ({
            fontFamily,
            fontSize,
            fontWeight,
            fontStyle,
            lineHeight,
            color: paletteColor
        }),
        [fontFamily, fontSize, fontStyle, fontWeight, lineHeight, paletteColor]
    );
    const classes = useStyles(bodyStyle);
    const className = `${classes.root} ${parentClassName}`;

    if(inline) {
        return (
            <span className={className} data-testid={dataTestId} style={style}>
                {children}
            </span>
        )
    }
    return (
        <div className={className} data-testid={dataTestId} style={style}>
            {children}
        </div>
    )
}

Body.propTypes = {
    variant: oneOf(Object.keys(variantMap)),
    color: oneOf(Object.keys(ThemeV2.palette)),
    fontFamily: string,
    inline: bool,
    className: string,
    children: oneOfType([arrayOf(node), node]).isRequired,
    disabled: bool,
    'data-testid': string,
    style: oneOfType([object, array]),
};
  
Body.defaultProps = {
    variant: 'body1',
    className: '',
    inline: false,
    disabled: false,
    'data-testid': '',
    style: {},
};

const MemoizedBody = React.memo(Body);
MemoizedBody.displayName = 'Body';

export default MemoizedBody;