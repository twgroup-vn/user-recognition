import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { getBadgeObjectForName, getImageForBadge } from '../../Utils/BadgesInfo';

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
}));

// const BadgeText = (props) => {
//     const badgeObj = getBadgeObjectForName(props.name);
//     const badgeImg = getImageForBadge(badgeObj, true);
//     return (
//       <div className="top-badges-names__div">
//         <img src={badgeImg} alt={badgeObj.displayName} className="top-badges__img" />
//         <div className="top-receivers-name__div ">{badgeObj.displayName}</div>
//       </div>
//     );
// };

function TopBadges() {
    const [value, setValue] = useState(1);
    const classes = useStyles();
    const handleChange = (event, index, value) => {
        setValue(value);
    }

    // const { topBadges } = this.props;
    return (
        <div className={classes.right_column_box}>
            <div className={classes.right_column_header}>
                <div className={classes.right_column_header_text}>
                    Top Badges
                </div>
            </div>
        </div>
    )
}

export default TopBadges