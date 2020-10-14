import React, { useState } from 'react';

import Body from '../atom/Body';
import ThemeV2 from '../V2/theme';

import { RECOGNITION_TIPS_HEADER_TEXT, RECOGNITION_TIPS }  from '../../assets/Util/constants';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon  from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
        background: ThemeV2.palette.gray[0],
        borderRadius: 4,
    },
    collapsingHeader: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '8px 12px',
        cursor: 'pointer',
        outline: 0,
        border: 'none',
        '&:focus': {
            background: ThemeV2.palette.gray[20],
        },
    },
    toggleButton: {
        position: 'absolute',
        top: '50%',
        right: 4,
        transform: 'translateY(-50%)',
    },
    tip: {
        display: 'grid',
        gridTemplateColumns: '22px auto',
        marginBottom: 8,
        '&:last-child': {
            // marginTop: 4,
        },
    },
    tipsWrapper: {
        padding: 12,
    },
    indexHolder: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        width: 44,
    },
    tipIndex: {
        color: ThemeV2.palette.white[0],
        zIndex: 0,
        '&:after': {
          content: "''",
          height: 20,
          width: 20,
          position: 'absolute',
          top: '50%',
          right: 'auto',
          left: 'auto',
          margin: 'auto',
          transform: 'translateY(-50%)',
          background: ThemeV2.palette.blue[60],
          borderRadius: '50%',
          zIndex: -2,
        },
    },
    contentWrapper: {
        paddingLeft: 20,
        paddingTop: 4
    },
    expandOpen: {
        transform: 'rotate(-180deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.short,
        }),
    },
}))

function GiveRecognitionTips (props) {
    const { isOpen, onToggleClick } = props;
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div
                className={classes.collapsingHeader}
                role='button'
                tabIndex={0}
                onClick={onToggleClick}
            >
                <Body variant='body2Medium'>
                    {RECOGNITION_TIPS_HEADER_TEXT}
                </Body>
                <IconButton 
                    className={classes.toggleButton}
                    aria-expanded={isOpen}
                    aria-label="show more"
                >
                    <ExpandMoreIcon 
                        className={
                            isOpen ? classes.expandOpen : ''
                        }
                    />
                </IconButton>
            </div>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <div className={classes.tipsWrapper}>
                        {RECOGNITION_TIPS.map((tip, index) => (
                            <div className={classes.tip} key={index}>
                                <div
                                    className={`${classes.indexHolder} ${index + 1 !== RECOGNITION_TIPS.length && classes.tipIndex}`}
                                >
                                    {index + 1 !== RECOGNITION_TIPS.length ? ( index + 1 ) : 
                                        ( 
                                            <StarIcon icon="star" style={{color: '#F5D45F'}}/>
                                        )
                                    }
                                </div>
                                <div className={classes.contentWrapper}>
                                    <Body variant="body2Medium">{tip.title}</Body>
                                    <Body variant="body2">{tip.body}</Body>
                                </div>
                            </div>
                        ))}
                    </div>
                </Collapse>
        </div>
    )
}

export default GiveRecognitionTips