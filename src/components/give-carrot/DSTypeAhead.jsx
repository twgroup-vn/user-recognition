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
import axios from 'axios';

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

function DSTypeAhead(props) {//props: handleUsers, onFocus, onBlur
    const { handleUsers, onFocus } = props;
    const [ inputValue, setInputValue ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState([]);
    const [ userInputIconOn, setUserInputIconOn ] = useState(false);
    const [ employees, setEmployees] = useState();

    useEffect(() => {
        updateUsersToParent(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem])

    useEffect(() => {
        async function fetchEmployees() {
            const res = await axios.get('https://camon.twgroup.vn/api/v1/home', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjE0NWRjNGI3LWQyODEtNDIzNi1hZjYwLWM2MmI3NDk3YmVjYSIsImVtYWlsIjoicGhhdGx0QHR3Z3JvdXAudm4ifQ.Ft8bNFXhOSbFneB_A4_zqzM3QMpzOEpHUo-OuAOJAC-nDqb3M1S0mGtqcMhadbdP8LP0fws9ecK3FNgvazKf1btp6Ojg5hCxORy2Wc8LAohb_cl4T3_DKy44XvYkVKM8zX61WLud2yUcTrpe46cbX80n6ItahSNvvQNtR0j_x-BzeaSr0MX13hrftKqGdFZGG6NKOS9THEHzNLXhkcG3m4vxXv3rNPyeDMQIimw3EF2FNjBNhZJff2Dj0_QtullEm26hf4NrS5ZjZBPJJo6SgSH7-M4hrOtPTAhLB0_QsBJm6W4Oq9OYd-cxe470WpeSz1TIPuVLJV9TEKW95lcDK-SXBH781xwxvr3WLpbK7qe-RdGnEOl1ymnoJAH7TpIWCAsiVUOmob3xjUDrvuylLACQ43k5sfh4au9vch9-AIR74US0uIdJZGfnPeUGc4QMz8rrlztnRhdvLBwErWkqg-lebjICvWg-5GQm6FPmpalNxTBB1QX20B-3Hg1hr8LqiptVWhn6156DSRwxjLCgyaQrsq707fseYZbKDRi35VVus9dMhCTVlQ11SH2TLOpd8n1EeHsL3ESObtdXzNFrVKgKAVnQawWnYM1ZEim4yzaVBbHgKqB2QKCupdj-U6pMH0oVA8t1se0RuRMageF4_TRlAnOC1Oq2z0Lhmv_VAlI'
                }
            })
            setEmployees(res.data.data.employees);
            
        }
        fetchEmployees()
    }, [])

    const classes = useStyles();
    
    const updateUsersToParent = (selectedItem) => {
        handleUsers(
            selectedItem.map((id) => employees.find((user) => user.id === id)),
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

        return users.map(
            (user, index) => renderOption({
                user,
                index,
                itemProps: getItemProps({item: user.id}),
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
                key={user.id}
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
                    {/* { || `@${user.profile.first_name}`} */}
                    { user.profile.user_name ? `@${user.profile.user_name}` : `@${user.profile.first_name}`}
                </span>
            </MenuItem>
        )
    }

    const findUsers = (inputValue) => {
        let count = 0;
        return employees.filter((user) => {
            const username = user.profile.user_name || '';
            let keep = (
                !inputValue ||
                user.profile.first_name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                user.profile.last_name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            ) && (count < 20);
            if (selectedItem.indexOf(user.id) !== -1) {
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
                                            const user = employees.find((u) => u.id === item); //employee props
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
                                        placeholder: 'Người được nhận',
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