import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import StyledModal from '../V2/StyledModal';
import StyledCloseButton from '../V2/StyledCloseButton';
import StyledButton from '../V2/StyledButton';
import CustomTypography from '../V2/CustomTypography';
import CustomCarrotInputField from '../V2/CustomCarrotInputField';
import themeV2 from '../V2/theme';


const useStyles = makeStyles((theme) => ({
    Modal: {
        '& .MuiDialogContent-root': {
          width: '500px',
          padding: '44px 54px 24px 54px',
        },
    },
    buttonHolder: {
        marginTop: 30,
        display: 'flex',
    },
    button: {
        display: 'block',
        borderRadius: 3,
        width: '50%',
    }
}));

function CustomImpactModal(props) {
    
    // const { classes, openModal, customCompanyIcon } = this.props;

    const maxGivingAllowance = () => {
        if (props.selectedUsers.length <= 1) {
          return {
            availablePoints: props.availablePointsToGive,
          };
        }

        const maxPointsToGive = Math.floor(
          props.availablePointsToGive / props.selectedUsers.length,
        );

        const maxPointsToGiveText = `${maxPointsToGive} each`;
        return { availablePoints: maxPointsToGive, maxPointsToGiveText };
    
    }

    const { availablePoints, maxPointsToGiveText } = maxGivingAllowance();

    const [impact, setImpact] = useState('');
    const [carrots, setCarrots] = useState('');
    const [invalidValue, setInvalidValue] = useState(false);
    const [formtouched, setFormtouched] = useState(false);
    const [selectTouched, setSelectTouched] = useState(false);

    const classes = useStyles();
    
    const onCarrotInputChange = (e) => {
        const { value } = e.target;
        const { availablePoints } = maxGivingAllowance();
        if (!value || value.match(/^\d{1,}$/)) {
            const total = props.selectedUsers.length > 0 ? props.selectedUsers.reduce(
                (sum, user) => sum + parseInt(value, 10),
                    0,
                )
                : value;

            const remaining = availablePoints - value;

            let invalidValue = false;

            if (total > 0) {
              if (remaining < 0) {
                invalidValue = true;
              }
            }

            if (value !== '') {
              setFormtouched(true)
            }

            else {
              setFormtouched(false)
            }
            
            setCarrots(value)
            setInvalidValue(invalidValue);
            // this.setState(() => ({
            //   carrots: value,
            //   invalidValue,
            // }));
            // this.props.handleCarrots(value);
        }
    }
    const closeModal = () => {
        // this.resetState();
        // this.props.closeModal();
        // this.setState({ selectTouched: false, formtouched: false });
    }

    const onConfirmClick = () => {
        
    }

    return (
        (
            <StyledModal
                className={classes.Modal}
                open={props.openModal}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <StyledCloseButton onClick={closeModal} />
                <CustomTypography variant="h5" weight="bold" gutterBottom>
                    Give a custom amount.
                </CustomTypography>
                <CustomTypography variant="body2" style={{ marginTop: 10 }} gutterBottom>
                    Giving a custom amount still requires an impact selection. Select an impact and enter an amount.
                </CustomTypography>
                <div style={{ marginTop: '16px' }}>
                    <CustomCarrotInputField 
                        placeholder="Enter custom amount..."
                        helperText={`You can give up to:  ${
                          maxPointsToGiveText ? maxPointsToGiveText : availablePoints
                        }`}
                        error={invalidValue}
                        onChange={onCarrotInputChange}
                        value={carrots}
                        customCompanyIcon={props.customCompanyIcon}
                    />
                </div>
                <div className={classes.buttonHolder}>
                    <StyledButton
                        variant="contained"
                        style={{
                            boxShadow: 'none',
                            marginRight: 16,
                            border: `1px solid ${themeV2.palette.lightGray1}`,
                            backgroundColor: '#F6F6F6',
                            color: themeV2.palette.darkGray3
                        }}
                        onClick={closeModal}
                        className={classes.button}
                    >
                        Cancel
                    </StyledButton>
                    <StyledButton
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        disabled={ !formtouched || invalidValue }
                        onClick= {onConfirmClick}
                    >
                        Enter
                    </StyledButton>
                </div>
            </StyledModal>
        )
    )
}

export default CustomImpactModal