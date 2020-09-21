import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classNames from 'classnames';

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

const useStyles = makeStyles((theme) => ({
    post_container: {
        border: '.5px solid #EEEEEE',
        background: '#FFFFFF',
        borderRadius: 2,
        marginBottom: 10,
    },
    form_container: {
        position: 'relative',
        width: '100%'
    },
    p_16: {
        padding: 16
    },
    input_row_style: {
        position: 'relative',
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
    }
}));

function PostRecognition () {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const canGivePoints = true;
    return (
        <div className={classes.post_container}>
            <div style={{overflow: 'hidden', width: 'calc(100% - 1px)'}}>
                <StyledTabs
                    centered
                    variant='fullWidth'
                    value={value}
                    onChange={handleChange}>
                    <StyledTab disableRipple label='Give Recognition' />
                </StyledTabs>
            </div>
            <form className={classes.form_container}>
                <div className={classes.p_16}>
                    <div 
                        className={classNames(
                            'row',
                            'shoutout-user-select',
                            classes.input_row_style,
                        )}
                    >
                        {/* <DSTypeAhead
                            handleUsers={this.handleTypeAheadUsers}
                            onFocus={this.onUserInputFocus}
                            onBlur={this.onUserInputBlur}
                            // key="DSTypeAhead"
                        /> */}
                    </div>
                    {
                        canGivePoints && (
                            <div
                                className={classNames(
                                'row',
                                'shoutout-impactvalue-select',
                                classes.input_row_style,
                                )}
                            >
                                {/* <ImpactValueSelector
                                    carrots={this.state.carrots}
                                    impact={this.state.impact}
                                    onChange={this.handleImpactValueChange}
                                    options={impactLevels}
                                    selectedUsers={this.state.selectedUsers}
                                    mePointsToGive={this.props.mePointsToGive}
                                    carrotsPerPost={carrotsPerPost}
                                    error={this.state.carrotError}
                                    canGiveCustomAmount={canGiveCustomAmount && canGivePoints}
                                    canGivePoints={canGivePoints}
                                    onImpactOpen={this.onImpactOpen}
                                    onImpactClose={this.onImpactClose}
                                    customCurrency={customCurrency}
                                    customCompanyIcon={customCompanyIcon}
                                /> */}
                            </div>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default PostRecognition