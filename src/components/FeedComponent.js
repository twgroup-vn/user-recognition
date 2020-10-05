import React from 'react';
import ReactHoverObserver from 'react-hover-observer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { getProfileFullName } from '../assets/Util/text';
import { getBadgeObjectForName, getImageForBadge } from '../assets/Util/BadgesInfo';
import CarrotIcon from './CarrotIcon';

const useStyle = makeStyles({
    feed_card_header_text: {
        flexFlow: 'row wrap',
        display: 'flex',
        alignItems: 'baseline'
    },
    username_clickable: {
        cursor: 'pointer',
        color: '#2c2c2c'
    },
    feed_card_from: {
        fontWeight: 600,
        whiteSpace: 'normal',
        fontSize: 14
    },
    feed_card_to: {
        fontWeight: 600,
        whiteSpace: 'normal',
        fontSize: 14
    },
    feed_card_badge_img: {
        width: 20,
        height: 20,
        margin: '0 3px',
        whiteSpace: 'normal'
    },
    username_clickable_to_span: {
        color: '#f40',
        cursor: 'pointer'
    },
    feed_card_carrots: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        margin: '16px 0',
        padding: 12,
        color: '#2c2c2c'
    }
})

// const UserNameComponent = (isHovering = false, users ) => {
//     const onClick = (user) => {
//         onUserClicked(user);
//     };

//     const usersToShow = Array.from(users);
//     usersToShow.shift();
// }

const ClickableFromUserName = ({ user }) => {
    // const onClick = () => {
    //   onUserClicked(user);
    // };
    const classes = useStyle();
    return (
      <p
        // onClick={onClick}
        className={
          user.isDeleted
            ? classNames(classes.username_clickable, classes.feed_card_from, classes.deactivated_user)
            : classNames(classes.username_clickable , classes.feed_card_from)
        }
        style={{ marginBottom: 0 }}
      >
        {user.isDeleted ? 'Deactivated User' : getProfileFullName(user)}
      </p>
    );
};

const ClickableUserName = ({ user }) => {
    // const onClick = () => {
    //     onUserClicked(user);
    // };
    const classes = useStyle();
    return (
        <p
        // onClick={onClick}
          className={
            user.isDeleted ? 'deactivated_user' : classes.username_clickable_to_span
          }
          style={{ marginBottom: 0 }}
        >
          {user.isDeleted ? 'Deactivated User' : getProfileFullName(user)}
        </p>
    )
}
function FeedCardTitle(props) {
    const classes = useStyle();
    // const to = props.to.users;

    const hasBadge = () => {
        const badge = props.badges && props.badges.length > 0
            ? getBadgeObjectForName(props.badges[0])
            : null
        if (badge) {
            return (
                <span className={classes.feed_card_gave}>
                    &nbsp;recognized and gave a{' '}
                    <img className={classes.feed_card_badge_img}
                        alt={badge.displayName}
                        title={badge.displayName}
                        src={getImageForBadge(badge, true)}
                    />
                    {badge.displayName} badge to&nbsp;
                </span>
            )
        }
        else {
            return (
                <span className={classes.feed_card_gave} style={{ display: 'contents', marginBottom: 0 }}>
                    &nbsp;recognized&nbsp;
                </span>
            )
        }
    }

    return (
        <div className={classes.feed_card_header_text}>
            <ClickableFromUserName 
                user={props.from}
                // onUserClicked={onUserClicked()}
            />
            {hasBadge()}
            {props.to.length> 2 ? (
                <span className={classes.feed_card_to}>
                    <ReactHoverObserver>
                        {/* <UserNameComponent
                            users={to}
                            onUserClicked={this.onUserClicked}
                        /> */}
                    </ReactHoverObserver>
                </span>
            ) : Number(props.to.length) === 1 ? (
                <span className={classes.feed_card_to} style={{display: 'flex'}}>
                    <ClickableUserName
                        user={props.to[0]}
                        // isTo
                        // onUserClicked={this.onUserClicked}
                    />
                </span>
            ) : (
                <span className={classes.feed_card_to} style={{display: 'flex'}}>
                    <ClickableUserName
                        user={props.to[0]}
                        // isTo
                        // onUserClicked={this.onUserClicked}
                    />
                    <span className="feed-card-gave">&nbsp;and&nbsp;</span>
                    <ClickableUserName
                        user={props.to[1]}
                        // isTo
                        // onUserClicked={this.onUserClicked}
                    />
                </span>
            )}
        </div>
    )
}

export default FeedCardTitle;

export const FeedValue = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.feed_card_carrots}>
            <div>{props.value}</div>
            <CarrotIcon
                style={{ fontSize: 20, fontFamily: 'Segoe ui emoji' }}
                active
                url={props.customCompanyIcon}
            />
        </div>
    )
}