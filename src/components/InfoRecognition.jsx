import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CarrotIcon from './CarrotIcon';
import moment from 'moment';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { StoreContext } from '../store/StoreContext';

const useStyles = makeStyles((theme) => ({
    balance_container: {
        border: '.5px solid #EEEEEE',
        background: '#FFFFFF',
        borderRadius: 2,
        marginBottom: 10,
    },
    redeem_container: {
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
        // fontSize: 16,
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
    const { points_earned } = React.useContext(StoreContext);
    const { remaining_point } = React.useContext(StoreContext);
    
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
                    showEarnedBalance && <StyledTab value={0} label="Số ❤️ nhận được" />
                }
                {
                    showAllowance && <StyledTab value={1} label="Số ❤️ còn lại" />
                }
            </StyledTabs>
            {
                slideIndex === 0 && (
                    <div className={classes.redeem_container}>
                        <div className={classes.balance_carrots}>
                            {points_earned}
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
                    <div className={classes.redeem_container}>
                        <div className={classes.balance_carrots}>
                            <div>
                                {remaining_point}
                            </div>
                            <CarrotIcon
                                style={{ fontSize: 24, fontFamily: 'Segoe UI Emoji' }}
                                active
                                url={customCompanyIcon}
                            />
                        </div>
                        <div className={classes.giving_container}>
                            <div className={classes.remaining_container}>
                                Số dư
                            </div>
                            <div className={classes.date_container}>
                                Được làm mới vào ngày:{' '}
                                {moment()
                                .add(1, 'months')
                                .startOf('month')
                                .format('D/M/YY')}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Balance