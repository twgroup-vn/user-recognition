import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Img }  from 'react-image';
import { getImageForBadge } from '../../assets/Util/BadgesInfo';
//import badge_selected from '../../../../img/badge_selected.png';

const useStyles = makeStyles(() => ({
    badge_selector_item: {
        height: 90,
        padding: 10,
        position: 'relative',
        cursor: 'pointer'
    },
    badge_selector_img: {
        width: 54,
        height: 54
    },
    badge_selector_name: {
        color: '#4b4f56',
        fontSize: 8,
        fontWeight: 400,
        textAlign: 'center',
        marginTop: 10,
        wordWrap: 'break-word',
        width: 54
    },
}))
function BadgesItem(props) {
    const classes = useStyles();
    return (
        <div
            className={classes.badge_selector_item}
            onClick={props.onSelect}
        >
            <Img
                className={classes.badge_selector_img}
                alt={`badge-${props.badge.name}`}
                src={getImageForBadge(props.badge)}
            />
            <div className={classes.badge_selector_name}>
                {props.badge.displayName}
            </div>
        </div>
    )
}

export default BadgesItem