import React from 'react';
import BadgesItem from './BadgesItem';
import { badges } from '../../assets/Util/BadgesInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    badge_selector_wrapper: {
        width: 320,
        height: 230,
        padding: 10
    },
    badge_selector_body: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    badge_selected_image: {
        width: 60,
        height: 61,
        position: 'absolute',
        top: 7,
        left: 7
    }
}))

function BadgesSelector(props) {
    const classes = useStyles();

    return (
        <div className={classes.badge_selector_wrapper}>
            <div className={classes.badge_selector_body}>
                {
                    badges.map((badge) => (
                        <BadgesItem
                            key={badge.name}
                            badge={badge}
                            selected={props.selectedBadge ? props.selectedBadge.name === badge.name : false}
                            onSelect={() => { props.updateSelected(badge) }}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BadgesSelector;
