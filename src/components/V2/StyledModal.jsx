import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 520,
        padding: 54,
        [theme.breakpoints.down('xs')]: {
          width: 350,
          padding: '20px 22px',
        },
        background: '#FFFFFF',
        border: '1px solid #F6F6F6',
        boxSizing: 'border-box',
        borderRadius: 10,
        outline: 'none',
    },
}))

export default function StyledModal(props) {
    const classes = useStyles();
  
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
        BackdropProps={{
          style: {
            background: '#000000',
            mixBlendMode: 'normal',
            opacity: 0.8,
          },
        }}
      >
        <div className={props.customClass ? props.customClass : classes.paper}>
          {props.children}
        </div>
      </Modal>
    );
}  

