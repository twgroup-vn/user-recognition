import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CarrotIcon from './CarrotIcon';
import moment from 'moment';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    balance_container: {
        border: '.5px solid #EEEEEE',
        background: '#FFFFFF',
        borderRadius: 2,
        marginBottom: 10,
    },
    reem_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 25px'
    },
    balance_carrots: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 34,
        color: '#2c2c2c',
        alignItems: 'center'
    },
    giving_container: {
        paddingLeft: 10
    },
    remaining_container: {
        color: '#2c2c2c',
        fontSize: 12,
        fontWeight: 700
    },
    date_container: {
        color: '#2c2c2c',
        fontSize: 12
    }
}));

const StyledTabs = withStyles({
    root: {
        background: '#f6f6f6'
    },
    indicator: {
      backgroundColor: '#EEEEEE',
    },
})(Tabs);
  
const StyledTab = withStyles(() => ({
    root: {
        textTransform: 'none',
        color: '#2C2C2C',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: '.5px',
        '&:focus': {
        outline: 'none'
        },
    },
}))((props) => <Tab disableRipple {...props} />);

function Balance (props) {
    const classes = useStyles();
    let showEarnedBalance = true;
    let showAllowance = true;
    const { slideIndex, onHandleChange } = props;
    const customCompanyIcon = {
        type: 'emoji',
        value: {
            hexCode: "02764",
            id: "heart"
        }
    }

    const handleChange = (event, newValue) => {
        onHandleChange(newValue);
    };

    return (
        <div className={classes.balance_container}>
            <StyledTabs value={slideIndex}
                variant='fullWidth'
                onChange={handleChange}
            >
                {
                    showEarnedBalance && <StyledTab value={0} label="Earned Balance" />
                }
                {
                    showAllowance && <StyledTab value={1} label="Giving Allowance" />
                }
            </StyledTabs>
            {
                slideIndex === 0 && (
                    <div className={classes.reem_container}>
                        <div className={classes.balance_carrots}>
                            100
                            <CarrotIcon
                                style={{fontSize: 24, fontFamily: 'Segoe UI Emoji'}}
                                active
                                url={customCompanyIcon}/>
                        </div>
                    </div>
                )
            }
            {
                slideIndex === 1 && (
                    <div className={classes.reem_container}>
                        <div className={classes.balance_carrots}>
                            <div>
                                {/* {this.props.mePointsToGive !== null
                                ? this.props.mePointsToGive
                                : ''} */}
                                200
                            </div>
                            <CarrotIcon
                                style={{ fontSize: 20, marginLeft: 5, marginTop: 2 }}
                                active
                                url={customCompanyIcon}
                            />
                        </div>
                        <div className={classes.giving_container}>
                            <div className={classes.remaining_container}>
                                Remaining Allowance
                            </div>
                            <div className={classes.date_container}>
                                Refreshes on:{' '}
                                {moment()
                                .add(1, 'months')
                                .startOf('month')
                                .format('M/D/YY')}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Balance