import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Downshift from 'downshift';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '100%',
      position: 'relative',
      zIndex: 3,
    },
    container: {
      flexGrow: 1,
      position: 'relative',
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      maxHeight: '260px',
      overflowY: 'auto',
      marginTop: 45,
      marginLeft: 48,
      background: '#FFFFFF',
      boxShadow:
        '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      borderRadius: 2,
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipAvatar: {
      height: '22px !important',
      width: '22px !important',
      marginLeft: 5,
      // marginTop: 5,
    },
    chipRoot: {
      backgroundColor: '#F6F6F6',
    },
    chipLabel: {
      color: theme.palette.text.main,
      fontWeight: 600,
      fontSize: 12,
      paddingLeft: 8,
    },
    chipDeleteIcon: {
      color: '#E2E2E2',
    },
    inputRoot: {
      flexWrap: 'wrap',
    },
    inputStyle: {
      width: 'auto !important',
      flexGrow: 1,
      // marginTop : 12,
      // marginBottom : 7,
    },
    underline: {
      '&:after': {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      },
      '&:before': {
        borderBottom: '1px solid rgb(224, 224, 224)',
      },
      // '&:hover:not($disabled):after': {
      //   borderBottom: '1px solid rgb(224, 224, 224) !important',
      // },
      '&:hover:before': {
        // '&:hover:not($disabled):before':
        borderBottom: '1px solid rgb(224, 224, 224) !important',
      },
    },
    noUserDiv: {
      padding: '20px 16px',
      color: 'rgba(117,117,117,87)',
      fontSize: 15,
    },
    inviteUsersDiv: {
      display: 'flex',
      padding: '20px 16px',
      color: 'rgba(117,117,117,87)',
      fontSize: 15,
    },
    altUsersDiv: {
      padding: '0px 16px 10px 16px',
      color: 'rgba(117,117,117,87)',
      fontSize: 12,
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50px',
      height: '31px',
    },
    iconStyle: {
      fontSize: '16px',
      cursor: 'pointer',
    },
    carrotIconStyle: {
      top: 2,
      left: 2,
    },
    iconInactiveStyle: {
      color: '#9e9e9e',
      filter: 'grayscale(1)',
    },
    iconActiveStyle: {
      color: theme.palette.primary.main,
      filter: 'grayscale(0)',
    },
    menuSelected: {
      backgroundColor: '#F8F8F8 !important',
    },
}))

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
    return (
      <TextField
        autoComplete="off"
        InputProps={{
          inputRef: ref,
  
          classes: {
            root: classes.inputRoot,
            input: classes.inputStyle,
            underline: classes.underline,
          },
          ...InputProps,
          // inputProps: {
          //   className: classes.inputStyle
          // },
        }}
        {...other}
      />
    );
}

function DownshiftMultiple () {

    const classes = useStyles();
    const [userInputIconOn, setUserInputIconOn] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState([]);
    const employees = []; // mapStateToProps

    return (
        <Downshift
            inputValue={inputValue}
            // onChange={handleChange}
            selectedItem={selectedItem}
        >
            {
                ({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex,
                    openMenu,
                }) => (
                    <div className={classes.root}>
                        <div className={classes.iconWrapper}>
                            <div className={classNames(
                                classes.iconStyle,
                                userInputIconOn ? classes.iconActiveStyle : classes.iconInactiveStyle  
                            )}
                                onClick={() => this.inputRef.focus()}
                            >
                                <span role="img" aria-label="icon">
                                    😎
                                </span>
                            </div>
                        </div>
                        {/* <div style={{ width: '100%' }}>
                            {
                                renderInput(
                                    {
                                        fullWidth: true,
                                        classes,
                                        ref: (inputRef) => {
                                            this.inputRef = inputRef;
                                        },
                                        InputProps: getInputProps({
                                            startAdornment: selectedItem.map((item) => {
                                                const user = employees
                                            })
                                        })
                                    }
                                )
                            }
                        </div> */}
                    </div>
                )
            }
        </Downshift>
    )
}

export default DownshiftMultiple