import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import DropIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from '../components/DropdownMenu';
import { getProfileFullName } from '../assets/Util/text';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    right_column_box: {
        position: 'relative',
        background: '#FFFFFF',
        border: '0.5px solid #EEEEEE',
        borderRadius: 2,
        padding: 20,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    right_column_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    right_column_header_text: {
        fontWeight: 700,
        fontSize: 16,
        color: '#2c2c2c',
        flexGrow: 1
    },
    dropIcon: {
        position: 'absolute',
        right: 2,
        color: '#4A4A4A',
    },
    top_receivers_row_div: {
        position: 'relative',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: 5,
        paddingTop: 5
    },
    top_receivers_name: {
        color: '#2c2c2c',
        fontSize: 14,
        paddingRight: 40,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    top_receivers_carrots: {
        display: 'flex',
        position: 'absolute',
        right: 0
    },
    top_receivers_carrots_text: {
        color: '#212121',
        fontSize: 14,
        fontWeight: 700
    }
}));

const StyledButton = withStyles({
    root: {
        textTransform: 'none',
        // width: 160,
        minHeight: 30,
        padding: '5px 8px',
        paddingRight: 28,
        position: 'relative',
        '&:focus': {
            outline: 'none',
        }
    },
    label: {
        color: '#4A4A4A',
        fontSize: 15,
        justifyContent: 'start',
        fontWeight: 'lighter',
    },
})(Button);

const topReceivers = [//call API to get list
    {
        id: '0',
        count: 6,
        user: {
            pointsEarned: 90,
            pointsEarnedThisMonth: 90,
            pointsGiven: 50,
            totalPointsEarned: 90,
            totalPointsGiven: 50,
            profile: {
                firstName: 'Võ',
                lastName: 'Minh Nguyệt'
            }
        }
    },
    {
        id: '1',
        count: 4,
        user: {
            pointsEarned: 60,
            pointsEarnedThisMonth: 60,
            pointsGiven: 20,
            totalPointsEarned: 60,
            totalPointsGiven: 20,
            profile: {
                firstName: 'Võ',
                lastName: 'Xuân Bách'
            }
        }
    },
    {
        id: '2',
        count: 3,
        user: {
            pointsEarned: 60,
            pointsEarnedThisMonth: 60,
            pointsGiven: 20,
            totalPointsEarned: 60,
            totalPointsGiven: 20,
            profile: {
                firstName: 'Nguyễn',
                lastName: 'Minh Ý'
            }
        }
    },
    {
        id: '3',
        count: 1,
        user: {
            pointsEarned: 20,
            pointsEarnedThisMonth: 20,
            pointsGiven: 40,
            totalPointsEarned: 20,
            totalPointsGiven: 40,
            profile: {
                firstName: 'Trương',
                lastName: 'Quốc Huy'
            }
        }
    }
]

function TopReceivers() {
    const classes = useStyles();
    const [value, setValue] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOptionClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleMenuItemClick = (e, idx) => {
        let filterBy;
        if (idx === 1) {
            filterBy = 'monthly';
        }

        else if (idx === 2) {
            filterBy = 'quarterly';
        }

        else {
            filterBy = 'alltime';
        }

        //dispatch action
        // this.props.dispatch(getSidebarInfoAction(filterBy));
        setValue(idx);
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onUserClicked = (user) => {
        //call API
        // this.props.dispatch(uiActions.showUserProfile(user));
        alert("click user");
    }
    
    const getTopReceiversSorted = () => {
        
        let sorted = topReceivers.sort((a, b) => a.count < b.count);
        sorted = sorted.length > 5 ? sorted.slice(0, 5) : sorted;
        return sorted;
    };

    let buttonLabel;

    if (value === 1) {
      buttonLabel = 'Monthly';
    }

    else if (value === 2) {
      buttonLabel = 'Quarterly';
    }

    else {
      buttonLabel = 'All Time';
    }

    const isEmpty = topReceivers.length === 0;

    const CarrotText = (props) => (
      <div className={classes.top_receivers_carrots}>
        <div
          className={classes.top_receivers_carrots_text}
          style={{ marginRight: 10 }}
        >
          {props.value}
        </div>
        {/* <img src={ic_gc_carrot} alt="carrot" className="allowance-change-carrrot__img" /> */}
      </div>
    );

    return (
        <div className={classes.right_column_box}>
            <div className={classes.right_column_header}>
                <div className={classes.right_column_header_text}>
                    Top Receivers
                </div>
                <StyledButton
                    aria-label='Options'
                    aria-owns={anchorEl ? 'menu' : null}
                    aria-haspopup='true'
                    onClick={handleOptionClick}
                >
                    {buttonLabel}
                    <DropIcon className={classes.dropIcon} />
                </StyledButton>
                <DropdownMenu
                    id="menu"
                    anchorEl={anchorEl}
                    open= {Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: 150,
                        },
                    }}
                >
                    <MenuItem
                        key={1}
                        // selected={this.state.value === 1}
                        onClick={(e) => handleMenuItemClick(e, 1)}
                    >
                        Monthly
                    </MenuItem>
                    <MenuItem
                        key={2}
                        // selected={this.state.value === 1}
                        onClick={(e) => handleMenuItemClick(e, 2)}
                    >
                        Quarterly
                    </MenuItem>
                    <MenuItem
                        key={3}
                        // selected={this.state.value === 2}
                        onClick={(e) => handleMenuItemClick(e, 3)}
                    >
                        All Time
                    </MenuItem>
                </DropdownMenu>
            </div>
            <div className='container' style={{marginTop: '10px'}}>
            {!isEmpty ?
            (
                getTopReceiversSorted().map((receiver) => (
                    <div key={receiver.id} className={classNames(
                        'row',
                        'justify-content-start',
                        classes.top_receivers_row_div)}>
                        <div className={classes.top_receivers_name} style={{cursor: 'pointer'}} 
                            onClick={() => this.onUserClicked(receiver.user)}>
                            {getProfileFullName(receiver.user)}
                        </div>
                        <CarrotText value={receiver.count} />
                    </div>
                ))
            ) : (
                    <div className="container top_receivers_noname_container">
                        <div className="row justify-content-center medium_icon_popovers">
                            <span role="img" aria-label="Smirking Face">
                            😏
                            </span>
                        </div>
                        <div className="row justify-content-center top_receivers_noname">
                            No top receivers, yet
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopReceivers