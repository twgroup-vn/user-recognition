import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import themeV2 from './theme';
import classNames from 'classnames';
import HelperText from './HelpText';
import CarrotIcon from '../CarrotIcon';

const useStyles = makeStyles(theme => ({
    textFieldWrapper: {
      display: 'flex',
      alignItems: 'start',
    },
    iconWrapper: {
      height: '44px',
      width: '44px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F6F6F6',
      borderTop: `1px solid ${themeV2.palette.lightGray1}`,
      borderBottom: `1px solid ${themeV2.palette.lightGray1}`,
      borderLeft: `1px solid ${themeV2.palette.lightGray1}`,
      borderRadius: '3px 0 0 3px',
      '&.invalid-value': {
        borderTop: `1px solid ${themeV2.palette.red2}`,
        borderBottom: `1px solid ${themeV2.palette.red2}`,
        borderLeft: `1px solid ${themeV2.palette.red2}`,
      },
    },
    helperText: {
      marginTop: '4px',
      marginLeft: -40,
    },
    inputWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: '6px',
      '& input': {
        borderRadius: '0 3px 3px 0',
        padding: '0px 14px',
        height: 44,
        border: `1px solid ${themeV2.palette.lightGray1}`,
        fontFamily: themeV2.typography.fontFamily,
        fontSize: 16,
        '&:focus': {
          outline: '0',
        },
        '&.invalid-value': {
          borderColor: themeV2.palette.red2,
        },
      },
    },
}));

function CustomCarrotInputField(props) {

    const errorClass = () => {
        if (props.error) {
          return 'invalid-value';
        } else {
          return '';
        }
    };

    const classes = useStyles();
    const {...rest} = props;
    // const {
    //     id,
    //     placeholder,
    //     helperText,
    //     inputProps,
    //     error,
    //     customCompanyIcon,
    //     inputChar,
    //     ...rest
    //   } = props;
    return (
        <div className={classNames(classes.textFieldWrapper, errorClass())}>
            <div className={classNames(classes.iconWrapper, errorClass())}>
                {props.inputChar ?
                    (
                        props.inputChar
                    ) : (
                        <CarrotIcon active size='20' url= {props.customCompanyIcon} />
                    )
                }
            </div>
            <div className={classes.inputWrapper}>
                <input 
                    id={props.id}
                    className={classNames(classes.textField, errorClass())}
                    autoComplete="off"
                    placeholder={props.placeholder}
                    {...rest}
                />
                <HelperText
                    error={props.error}
                    style={{ marginLeft: -40 }}
                >
                    {props.error ? `🚨 ${props.helperText}` : `👉 ${props.helperText}`}
                </HelperText>
            </div>
        </div>
    )
}

export default CustomCarrotInputField