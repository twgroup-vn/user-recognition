import React, { useState } from 'react';
import _ from 'lodash';
import ReactHoverObserver from 'react-hover-observer';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import themeV2 from '../V2/theme';

const useStyles = makeStyles((theme) => ({
    nestedSelect: {
      position: 'relative',
      left: 25,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto',
      color: '#00BBD1',
      fontWeight: themeV2.typography.fontWeightMedium,
      '& .MuiSelect-selectMenu': {
        marginLeft: '5px',
        fontWeight: themeV2.typography.fontWeightMedium,
      },
      '& .MuiInput-underline:before,.MuiInput-underline:after,.MuiInput-underline:hover:before': {
        borderBottom: 'none !important',
      },
      '& .MuiSelect-select:focus': {
        background: 'transparent',
      },
    },
    amountSelector: {
      position: 'relative',
      left: -65,
      visibility: 'hidden',
    },
    CarrotIcon: {
      opacity: '0.25',
    },
    CarrotIconHover: {
      opacity: '1',
    },
    MenuItem: {
      height: '46px',
      display: 'flex',
      padding: '0 0 0 16px',
      cursor: 'pointer',
      '&:hover': {
        background: '#F8F8F8',
        '& .MuiSvgIcon-root': {
          opacity: 1,
        },
      },
    },
    listCarrotIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingRight: '18px',
    },
    menuDiv: {
      display: 'flex',
      flex: 1,
      height: '100%',
      alignItems: 'center',
    },
    innerDefaultValues: {
      fontFamily: themeV2.typography.adminFontFamily,
      fontSize: '16px',
      fontWeight: themeV2.typography.fontWeightSemibold,
      marginBottom: '0px',
      opacity: '0.25',
      marginRight: '5px',
    },
    innerDropdownStyle: {
      maxHeight: '300px',
    },
}));

function ImpactSelectorItem(props) {//props: impact,onValueChange,defaultValue,availablePointsToGive
  // const {
  //   classes,
  //   option,
  //   impact,
  //   defaultValue,
  //   onSubSelectToggle,
  //   availablePointsToGive,
  //   onValueChange,
  //   canGivePoints,
  //   customCompanyIcon,
  //   customCurrency,
  //   selectedUsers,
  //   ...rest
  // } = this.props;
    let carrotAmount = props.defaultValue;
    let innerSelectValues = _.range(0, Number(props.defaultValue) + 1);
    
    if(props.defaultValue > props.availablePointsToGive) {
        carrotAmount = props.availablePointsToGive;
        innerSelectValues = _.range(0, Number(props.availablePointsToGive) + 1);
    }

    const value = carrotAmount || 0;
    // let customCurrencyDisp = props.customCurrency.NAME_TITLEIZED_PLURAL;
    let customCurrencyDisp = 'Tim';

    if (value === 1) {
        // customCurrencyDisp = props.customCurrency.NAME_TITLEIZED;
        customCurrencyDisp = 'Trophy';
    }

    let multipleUserText = '';

    if (props.selectedUsers.length > 1) {
        multipleUserText = 'each';
    }

    const onOptionSelect = () => {
        let carrotAmount = props.defaultValue;

        if (props.defaultValue > props.availablePointsToGive) {
            carrotAmount = props.availablePointsToGive;
        }

        props.onValueChange(props.impact, carrotAmount);
    }

    const toggleSelect = () => {
        props.onSubSelectToggle(!selectOpen);
        setSelectOpen(!selectOpen)
    }

    const handleChange = (e) => {
        props.onValueChange(props.impact, e.target.value);
    }

    const handleClose = () => {
        setSelectOpen(false);
        props.onSubSelectToggle(false);
    }

    const handleOpen = () => {
        setSelectOpen(true);
        props.onSubSelectToggle(true);
    }
    
    const [selectOpen, setSelectOpen] = useState(false);
    const classes = useStyles();
    const {...rest} = props;
    return (
        <div id='impact'>
            <ReactHoverObserver>
                {({isHovering}) => (
                    <div
                        className={classes.MenuItem}
                        key={props.impact}
                        value={props.impact}
                        {...rest}
                    >
                        <div className={classes.menuDiv} id='select-item' onClick={onOptionSelect}>
                            {props.option} Tặng {carrotAmount} {customCurrencyDisp} {multipleUserText}
                        </div>
                        {
                            props.canGivePoint && (
                                <div
                                    className={classes.nestedSelect}
                                    onClick={toggleSelect}
                                >
                                    {
                                        isHovering === true ? (
                                            <div id='select-custom-item'>
                                                <EditIcon fontSize='inherit' style={{position: 'relative', top: '2px'}} />
                                                &nbsp;Edit amount
                                                <Select
                                                    SelectDisplayProps = {{id: 'select-custom-item'}}
                                                    onChange={handleChange}
                                                    value={carrotAmount}
                                                    open={selectOpen}
                                                    onClose={handleClose}
                                                    onOpen={handleOpen}
                                                    className={classes.amountSelector}
                                                    MenuProps={{ classes: {
                                                        paper: classes.innerDropdownStyle
                                                     }}}
                                                >
                                                    {
                                                        innerSelectValues.map(innerSelectValue => (
                                                            <MenuItem value={innerSelectValue}
                                                                key={innerSelectValue}
                                                            >
                                                                {innerSelectValue}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        ) : (
                                            ''
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )}
            </ReactHoverObserver>
        </div>
    )
}

export default ImpactSelectorItem;