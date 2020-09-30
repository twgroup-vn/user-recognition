import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CustomImpactModal from './CustomImpactModal';
import themeV2 from '../V2/theme';
import CarrotIcon from '../CarrotIcon';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ImpactSelectorItem from './ImpactSelectorItem';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
    formControl: {
        width: '100%',
    },
    placeholderStyle: {
        color: 'rgba(223,223,223)',
        display: 'flex',
        justifyContent: 'space-between',
    },
    underline: {
        '&:after': {
          borderBottom: '2px solid #FFD700',
          transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },
        '&:before': {
          borderBottom: '1px solid rgb(224, 224, 224)',
        },
        '&:hover:before': {
          borderBottom: '1px solid rgb(224, 224, 224) !important',
        },
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '31px',
    },
    iconStyle: {
        justifyContent: 'center',
        cursor: 'pointer',
    },
    emoticonStyle: {
        justifyContent: 'center',
        cursor: 'pointer',
    },
    nestedFormControl: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto',
        '& .MuiInput-underline:before': {
          borderBottom: 'none',
        },
    },
    MenuItem: {
        height: '46px',
        display: 'flex',
        padding: '5px 18px 5px 16px',
        cursor: 'pointer',
        '&:hover': {
          background: '#F8F8F8',
        },
    },
    menuDiv: {
        display: 'flex',
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
    impactSelector: {
        '& .MuiSelect-select:focus': {
          background: 'transparent',
        },
    },
    impactSelectorDisabled: {
        '& .MuiSelect-icon': {
          visibility: 'hidden',
        },
    },
}));

function ImpactValueSelector(props) {//props: carrots,impact,onChange,options,selectedUsers,mePointsToGive,carrotsPerPost,error,canGiveCustomAmount,canGivePoints,onImpactOpen,onImpactClose,customCurrency,customCompanyIcon
    
    const placeholder = 'Add Trophies';
    let maxPointsToGive = props.mePointsToGive;

    if( props.selectedUsers.length > 0 ) {
        maxPointsToGive = Math.floor(props.mePointsToGive / props.selectedUsers.length)
    }

    const disableSelect = Number(props.mePointsToGive) === 0;
    const filterOption = props.options.filter((option, index) => {
        if(index > 0) {
            const preOption = props.options[index - 1];
            if (props.maxPointsToGive < preOption.goldLimit) {
                return false;
              }
        }
        return true;
    })

    // const {
    //     classes,
    //     carrots,
    //     options,
    //     canGiveCustomAmount,
    //     mePointsToGive,
    //     selectedUsers,
    //     canGivePoints,
    //     customCurrency,
    //     customCompanyIcon,
    //   } = this.props;
    const [inputIconOn, setInputIconOn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [subSelectOpen, setSubSelectOpen] = useState(false);
    const [customImpactModalOpen, setCustomImpactModalOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        props.onImpactOpen();
        setInputIconOn(true);
        setMenuOpen(true);
    }
    
    const handleClose = (e) => {
        let itemClicked = false;
        if (e) {
            if (e.target.id === 'select-custom-item') {
                itemClicked = true;
            }
        }
        if (!itemClicked && !subSelectOpen) {
            closeSelect();
        }
    }

    const onImpactSelected = (impact, carrots) => {
        props.onChange(impact, carrots);
        closeSelect();
    }

    const onSubSelectToggle = toggle => {
        setSubSelectOpen(toggle)
    };

    const closeSelect = () => {
        props.onImpactClose();
        setMenuOpen(false);
        if( props.impact || props.carrots ) {
            setInputIconOn(true);
        } else {
            setInputIconOn(false);
        }
    };

    const openCustomAmountModal = () => {
        setCustomImpactModalOpen(true);
    };

    const closeCustomImpactModal = () => {
        setCustomImpactModalOpen(false);
    }

    return (
        <div className={classes.root}>
            <CustomImpactModal 
                openModal={customImpactModalOpen}
                closeModal={closeCustomImpactModal}
                onClick={closeCustomImpactModal}
                availablePointsToGive={props.mePointsToGive}
                selectedUsers={props.selectedUsers}
                values={props.options}
                onImpactSelected={onImpactSelected}
                customCompanyIcon={props.customCompanyIcon}
            />
            <div style={{display: 'flex'}}>
                <div className={classes.iconWrapper}>
                    <CarrotIcon
                        className={props.customCompanyIcon && props.customCompanyIcon.type === 'emoji' ? classes.emoticonStyle : classes.iconStyle}
                        size="16"
                        active={inputIconOn}
                        onClick={handleOpen}
                        url={props.customCompanyIcon}
                        currency={props.customCurrency.NAME}
                    />
                </div>
                <FormControl className={classes.formControl}>
                    <Tooltip
                        title={
                            disableSelect
                              ? `This field is disabled. You’ve used your allowance but you can still give recognitions`
                              : ''
                        }
                        placement="top"
                    >
                        <Select
                            value={props.carrots}
                            open={menuOpen}
                            name="impactValue"
                            displayEmpty
                            fullWidth
                            onOpen={handleOpen}
                            onClose={handleClose}
                            className={classNames(classes.impactSelector, {
                                [`${classes.impactSelectorDisabled}`] : disableSelect,
                            })}
                            disabled={disableSelect}
                            input= {
                                <Input
                                    classes={{
                                        underline: classes.underline
                                    }}
                                    name="impactValue"
                                    id="impactValue"
                                />
                            }
                            renderValue={() => {
                                if(disableSelect) {
                                    return (
                                        <div className={classes.placeholderStyle}>
                                            <div>
                                                Your remaining allowance is 0 (zero), but you can still GIVERECOGNITIONs
                                            </div>
                                        </div>
                                    )
                                }
                                if(!(props.impact) && !(props.carrots)) {
                                    return (
                                        <div className={classes.placeholderStyle}>
                                            <div>{placeholder}</div>
                                        </div>
                                    )
                                }
                                const value = props.carrots || 0;
                                let customCurrencyDisp = 'Trophies';

                                if( value === 1 ) {
                                    customCurrencyDisp = 'Trophoy';
                                }
                                let goldSelected = value > 0 ? `${value} ${customCurrencyDisp}` : '';
                                const total = props.selectedUsers.reduce((sum, user) => sum + parseInt(value, 10), 0);
                                const remaining = props.mePointsToGive - (total > 0 ? total : value);
                                let excessAlert = false;

                                if(remaining < 0) {
                                    excessAlert = true;
                                }
                                if(total > 0) {
                                    if (remaining >= 0) {
                                        if (Number(props.selectedUsers.length) === 1) {
                                            goldSelected = `${total} ${customCurrencyDisp}`;
                                        }
                                        else {
                                            goldSelected = `${value} ${customCurrencyDisp} each`;
                                        }
                                    } else {
                                        goldSelected = `${value} ${customCurrencyDisp} each exceeds allowance`;
                                    }
                                }

                                const impactObj = props.options.find(
                                    option => option.value === props.impact,
                                );

                                let dispText;

                                if (Number(value) === 0) {
                                    dispText = 'No trophies';
                                } 
                                else if (!(props.impact)) {
                                    dispText = goldSelected;
                                }
                                else {
                                    dispText = `${impactObj.label} ${goldSelected}`;
                                }
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ color: excessAlert ? themeV2.palette.red2 : '' }}>
                                            {dispText}
                                        </div>
                                    </div>
                                )
                            }}
                        >
                            {
                                filterOption.map(option => (
                                    <ImpactSelectorItem
                                        option={option.label}
                                        impact={option.value}
                                        defaultValue={option.goldLimit}
                                        canGivePoints={props.canGivePoints}
                                        availablePointsToGive={maxPointsToGive}
                                        onValueChange={onImpactSelected}
                                        onSubSelectToggle={onSubSelectToggle}
                                        key={option.label}
                                        customCompanyIcon={props.customCompanyIcon}
                                        customCurrency={props.customCurrency}
                                        selectedUsers={props.selectedUsers}
                                    >
                                        {option.label}
                                    </ImpactSelectorItem>
                                ))
                            }
                            {props.canGiveCustomAmount && (
                                <div className={classes.MenuItem}>
                                    <div
                                        className={classes.menuDiv}
                                        onClick={openCustomAmountModal}
                                    >
                                        + Enter a custom amount
                                    </div>
                                </div>
                            )}
                        </Select>
                    </Tooltip>
                </FormControl>
            </div>
        </div>
    )
    
}

export default ImpactValueSelector