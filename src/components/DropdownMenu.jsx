import React , {useState} from 'react';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  toggleOverlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: '99',
  },
  paper: {
    background: '#fff',
    boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 9999,
  },
};

function DropdownMenu (props) {
    console.log(props)
    const {classes, open, onClose, anchorEl, children, placement} = props;

    // const [dropdownMenu, setDropdownMenu] = useState(false);
    // const [actionsPopover, setActionsPopover] = useState(null);
  
    // const onActionClick = (e) => {
    //     e.preventDefault();
    //     setDropdownMenu(!dropdownMenu);
    // }

    // const handleActionsPopoverClose = () => {
    //     setActionsPopover(false)
    // };

    return (
        <>
            {open && (
                <div className={classes.toggleOverlay} onClick={onClose}></div>
            )}
            <Popper
                open={open}
                anchorEl={anchorEl}
                style={{ zIndex: 9999 }}
                placement={placement ? placement : 'bottom'}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                    <div className={classes.paper}>{children}</div>
                    </Fade>
                )}
            </Popper>
        </>
    )
}

export default withStyles(styles)(DropdownMenu);
