import React from 'react';
import ReactHoverObserver from 'react-hover-observer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { getProfileFullName } from '../assets/Util/text';
import { getBadgeObjectForName, getImageForBadge } from '../assets/Util/BadgesInfo';
import CarrotIcon from './CarrotIcon';
import { ProfilePic } from '../assets/Util/profilePic';

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
        // fontSize: 14
    },
    feed_card_to: {
        fontWeight: 600,
        whiteSpace: 'normal',
        // fontSize: 14
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
    },
    users_list_container: {
        position: 'relative',
        cursor: 'pointer',
        color: '#2C2C2C'
    },
    users_list_hover : {
        position: 'absolute',
        width: 300,
        top: 20,
        left: -10,
        zIndex: 99,
        borderRadius: 2,
        fontSize: 14,
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: 'white',
        transition: 'transform 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        overflowY: 'auto'
    }
})

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
                    &nbsp;đã cảm ơn và trao danh hiệu{' '}
                    <img className={classes.feed_card_badge_img}
                        alt={badge.displayName}
                        title={badge.displayName}
                        src={getImageForBadge(badge, true)}
                    />
                    {badge.displayName} cho&nbsp;
                </span>
            )
        }
        else {
            return (
                <span className={classes.feed_card_gave} style={{ display: 'contents', marginBottom: 0 }}>
                    &nbsp;đã cảm ơn&nbsp;
                </span>
            )
        }
    }

    const UserNameComponent = (props) => {
        const onClickListItem = (user) => {
            // onUserClicked(user)
            console.log('onUserClicked')
        }
        const usersToShow = Array.from(props.users);
        usersToShow.shift();
        return (
            <div className={classes.users_list_container} style={{display: 'flex'}}>
                <ClickableUserName 
                    user={props.users[0]}
                    isTo
                    // onUserClicked={onUserClicked}
                />
                &nbsp;và {`${props.users.length - 1} người khác`}
                {
                    props.isHovering && (
                        <div className={classes.users_list_hover}>
                            <List>
                                {
                                    usersToShow.map((user) => (
                                        <ListItem
                                            button
                                            key={user.id}
                                            onClick={(user) => onClickListItem(user)}
                                        >
                                            <ListItemAvatar>
                                                <ProfilePic size={40} user={user} />
                                            </ListItemAvatar>
                                            <ListItemText primary={getProfileFullName(user)} />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <div className={classes.feed_card_header_text}>
            <ClickableFromUserName 
                user={props.from}
                // onUserClicked={onUserClicked()}
            />
            {hasBadge()}
            {props.to.length > 2 ? (
                <span className={classes.feed_card_to} style={{ display: 'flex' }}>
                    <ReactHoverObserver>
                        <UserNameComponent
                            users={props.to}
                            // onUserClicked={onUserClicked}
                        />
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