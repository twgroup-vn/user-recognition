import React, { useState, useEffect} from 'react';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getProfileFullName } from '../../assets/Util/text';
import { ProfilePic } from '../../assets/Util/profilePic';
import keycode from 'keycode';
import Downshift from 'downshift';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        zIndex: 3
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
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '31px'
    },
    iconStyle: {
        fontSize: '16px',
        cursor: 'pointer'
    },
    // iconActiveStyle: {
    //     color: 'red',
    //     filter: 'grayscale(0)'
    // },
    iconInactiveStyle: {
        color: '#9e9e9e',
        filter: 'grayscale(1)'
    },
    chip: {
        margin: '4px 2px'
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
    // underline: {
    //     '&:after': {
    //       borderBottom: `2px solid ${theme.palette.primary.main}`,
    //       transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    //     },
    //     '&:before': {
    //       borderBottom: '1px solid rgb(224, 224, 224)',
    //     },
    //     // '&:hover:not($disabled):after': {
    //     //   borderBottom: '1px solid rgb(224, 224, 224) !important',
    //     // },
    //     '&:hover:before': {
    //       // '&:hover:not($disabled):before':
    //       borderBottom: '1px solid rgb(224, 224, 224) !important',
    //     },
    // },
    menuSelected: {
        backgroundColor: '#F8F8F8 !important',
    },
    autocomplete_user_fullname: {
        paddingLeft: 8,
        fontSize: 12,
        color: '#2C2C2C',
        fontWeight: 600,
        letterSpacing: 0.2
    },
    autocomplete_user_username_focus: {
        fontSize: 15,
        color: '#e2e2e2'
    },
    autocomplete_user_username: {
        fontSize: 15,
        color: '#e2e2e2'
    }
}))

const employees = [
    {
        "profile": {
            "firstName": "Nguyet",
            "lastName": "Vo",
            "username": "nguyetvo",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Owner"
        ],
        "_id": "5f60a334e3f6bce90f93543a"
    },
    {
        "profile": {
            "firstName": "Minh Y",
            "lastName": "Nguyen",
            "username": "minh-y-nguyen",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Employee"
        ],
        "_id": "5f60a577937a424a11ee2b36"
    },
    {
        "profile": {
            "firstName": "Phat",
            "lastName": "Lam",
            "username": "phatlam",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Employee"
        ],
        "_id": "5f60bc0f937a427d33ee2bda"
    },
    {
        "profile": {
            "firstName": "Lại Văn Anh",
            "lastName": "Thức",
            "username": "lại văn anhthức",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Employee"
        ],
        "_id": "5f616ea5e53380557cea92a8"
    },
    {
        "profile": {
            "firstName": "Nguyen",
            "lastName": "Hieu Thuan",
            "username": "thuan",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Employee",
            "Admin"
        ],
        "_id": "5f630669ee72f4a9fa4a8107"
    },
    {
        "profile": {
            "firstName": "Quoc",
            "lastName": "Huy",
            "username": "huy",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Employee"
        ],
        "_id": "5f641ed95f84d36eabc8b61e"
    },
    {
        "profile": {
            "image": {
                "original": {
                    "relativeUrl": "https://s3-us-west-1.amazonaws.com/carrothrimage/5e83dcd6-0e23-4cea-aadd-c8f308ae033f1600756829709.jpg",
                    "absoluteUrl": "/carrothrimage/5e83dcd6-0e23-4cea-aadd-c8f308ae033f1600756829709.jpg",
                    "fileName": "5e83dcd6-0e23-4cea-aadd-c8f308ae033f1600756829709.jpg",
                    "s3bucket": "carrothrimage"
                },
                "resized": {
                    "relativeUrl": "https://s3-us-west-1.amazonaws.com/carrothrimageresized/5e83dcd6-0e23-4cea-aadd-c8f308ae033f1600756829709.jpg",
                    "absoluteUrl": "/carrothrimageresized/5e83dcd6-0e23-4cea-aadd-c8f308ae033f1600756829709.jpg",
                    "fileName": "5e83dcd6-0e23-4cea-aadd-c8f308ae033f1600756829709.jpg",
                    "s3bucket": "carrothrimage"
                }
            },
            "firstName": "Vo Xuan",
            "lastName": "Bach",
            "username": "xuanbach",
            "allowanceType": "regular",
            "status": "normal"
        },
        "role": [
            "Employee"
        ],
        "_id": "5f68543ce93e6cee1c997c6a"
    }
]
function DSTypeAhead(props) {//props: handleUsers, onFocus, onBlur
    // const { classes, employees } = this.props;
    const { handleUsers, onFocus } = props;
    const [ inputValue, setInputValue ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState([]);
    const [ userInputIconOn, setUserInputIconOn ] = useState(false);

    useEffect(() => {
        updateUsersToParent(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem])

    const classes = useStyles();
    
    const updateUsersToParent = (selectedItem) => {
        handleUsers(
            selectedItem.map((id) => employees.find((user) => user._id === id)),
          );
    }

    const renderInput = (inputProps) => {
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
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue && inputValue.length > 3) {
          //this.debounceGetHomeInfo(); lodash
        }
        setInputValue(inputValue)
    };

    const handleChange = (item) => {
        if (!item) {
          setInputValue('');
          return;
        }
    
        if (selectedItem.indexOf(item) === -1) {//not found
            let postSelectedItem = [...selectedItem, item];
            setInputValue('');
            setSelectedItem(postSelectedItem);
        }
    };

    const handleDelete = (item) => () => {
        const postSelectedItem = [...selectedItem];
        postSelectedItem.splice(selectedItem.indexOf(item), 1);
        setSelectedItem(postSelectedItem);
        handleUserInputIconStyleOff(selectedItem);
    };

    const onUserInputFocus = () => {
        setUserInputIconOn(true);
        onFocus();
    }

    const onUserInputBlur = () => {
        handleUserInputIconStyleOff(selectedItem);
    };

    const handleUserInputIconStyleOff = (selectedUsers) => {
        if( selectedUsers.length === 0 ) {
            setUserInputIconOn(false);
        }
    }

    const handleKeyDown = (e) => {
        if ( selectedItem.length && !inputValue.length && keycode(e) === 'backspace' ) {
            const postSelectedItem = selectedItem.slice(0, selectedItem.length - 1);
            setSelectedItem(postSelectedItem);
        }
    };

    const renderOptions = (inputValue, getItemProps, highlightedIndex) => {
        // const { selectedItem } = this.state;
        const users = findUsers(inputValue);
        // const { classes } = this.props;

        //TODO
        // if (users.length === 0) {
        //     const { employees, nonReceivers, me, employeeSetupStatus } = this.props;
        //     if (
        //       employees.length === 0 &&
        //       nonReceivers.length === 0 &&
        //       employeeSetupStatus === EMPLOYEES_SETUP_STATUSES.NO_EMPLOYEES
        //     ) {
        //       if (me && checkAdmin(me.role)) {
        //         return (
        //           <div
        //             className={`${classes.inviteUsersDiv} justify-content-between align-items-center`}
        //           >
        //             <div>No one has joined yet.</div>
        //             <Button
        //               variant="contained"
        //               color="primary"
        //               onClick={this.sendInvitesClick}
        //             >
        //               SEND INVITES
        //             </Button>
        //           </div>
        //         );
        //       }
        //     }
        //     let altUsers = this.findAltUsers(inputValue, employees || []);
        //     let altNonReceivers = this.findAltUsers(inputValue, nonReceivers || []);
        //     altUsers = altUsers
        //       ? altUsers.filter((user) => selectedItem.indexOf(user._id) === -1)
        //       : [];
        //     altNonReceivers = altNonReceivers || [];
        //     return (
        //       <div>
        //         <div className={classes.noUserDiv}>
        //           Can’t find anyone named “{inputValue}”…
        //         </div>
        //         {altUsers.length > 0 && (
        //           <div>
        //             <div className={classes.altUsersDiv}>
        //               Did you mean one these coworkers?
        //             </div>
        //             {altUsers.map((user, index) =>
        //               this.renderOption({
        //                 user,
        //                 index,
        //                 itemProps: getItemProps({ item: user._id }),
        //                 highlightedIndex,
        //                 disabled: false,
        //               }),
        //             )}
        //           </div>
        //         )}
        //         {altNonReceivers.length > 0 && (
        //           <div>
        //             <div className={classes.altUsersDiv}>
        //               You cannot send carrots to these coworkers
        //             </div>
        //             {altNonReceivers.map((user, index) =>
        //               this.renderOption({
        //                 user,
        //                 index: `${index}-non`,
        //                 itemProps: getItemProps({ item: user._id }),
        //                 highlightedIndex,
        //                 disabled: true,
        //               }),
        //             )}
        //           </div>
        //         )}
        //       </div>
        //     );
        // }

            return users.map((user, index) => renderOption({
                user,
                index,
                itemProps: getItemProps({item: user._id}),
                highlightedIndex,
                disabled: false
            })
        )
    }

    const renderOption = ({ user, index, itemProps, highlightedIndex, disabled }) => {
        const isHighlighted = highlightedIndex === index;
        return (
            <MenuItem
                {...itemProps}
                disabled={disabled}
                key={user._id}
                selected={isHighlighted}
                classes={
                    { selected: classes.menuSelected}
                }
            >
                <ProfilePic size={30} user={user} />
                <span className={classes.autocomplete_user_fullname}>
                    {getProfileFullName(user)}
                </span>
                <span className={isHighlighted ? classes.autocomplete_user_username_focus
                    : classes.autocomplete_user_username }
                >
                    {`@${user.profile.username}`}
                </span>
            </MenuItem>
        )
    }

    const findUsers = (inputValue) => {
        // const employees = this.props.employees ? this.props.employees : [];
        // const employees = props.employees || [];
        // const { selectedItem } = this.state;
        // employees mapStateToProps or declare dummy data
        let count = 0;
        return employees.filter((user) => {
            const username = user.profile.username || '';
            let keep = (
                !inputValue ||
                user.profile.firstName.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                user.profile.lastName.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            ) && (count < 20);
            if (selectedItem.indexOf(user._id) !== -1) {
                keep = false;
            }
            if (keep) {
                count += 1;
            }
            return keep;
        })
    }
    return (
        <Downshift
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}
        >
            {
                (
                    {
                        getInputProps,
                        getItemProps,
                        isOpen,
                        inputValue: inputValue2,
                        selectedItem: selectedItem2,
                        highlightedIndex,
                        openMenu,
                        closeMenu
                    }
                ) => (
                    <div className={classes.root}>
                        <div className={classes.iconWrapper}>
                            <div className={classNames(
                                classes.iconStyle,
                                userInputIconOn ? classes.iconActiveStyle : classes.iconInactiveStyle
                            )}
                                onClick={() => {
                                    this.inputRef.focus();
                                }}
                            >
                                <span role="img" aria-label="icon">
                                    😎
                                </span>
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            {
                                renderInput({
                                    fullWidth: true,
                                    classes,
                                    ref: (inputRef) => {
                                        return inputRef
                                    },
                                    InputProps: getInputProps({
                                        startAdornment: selectedItem.map((item) => { //selectedItem state
                                            const user = employees.find((u) => u._id === item); //employee props
                                            if (user) {
                                                return (
                                                    <Chip
                                                        avatar = {
                                                            <ProfilePic size={32} user={user} />
                                                        }
                                                        key={item}
                                                        tabIndex={-1}
                                                        label={getProfileFullName(user)}
                                                        className={classes.chip}
                                                        classes={{
                                                            root: classes.chipRoot,
                                                            avatar: classes.chipAvatar,
                                                            label: classes.chipLabel,
                                                            deleteIcon: classes.chipDeleteIcon,
                                                        }}
                                                        onDelete={handleDelete(item)}
                                                    />
                                                )
                                            }
                                            return null;
                                        }),
                                        onChange: handleInputChange,
                                        onKeyDown: handleKeyDown,
                                        placeholder: 'Search for a coworker(s)',
                                        id: 'integration-downshift-multiple',
                                        onFocus: (event) => {
                                            openMenu();
                                            onUserInputFocus();
                                        },
                                        onBlur: (event) => {
                                            closeMenu();
                                            onUserInputBlur();
                                        }
                                    })
                                })
                            }
                        </div>
                        {
                            isOpen ? (
                                <Paper className={classes.paper} square>
                                    {
                                        renderOptions(
                                            inputValue2,
                                            getItemProps,
                                            highlightedIndex
                                        )
                                    }
                                </Paper>
                            ) : null
                        }
                    </div>
                )
            }
        </Downshift>

    )
}

export default DSTypeAhead