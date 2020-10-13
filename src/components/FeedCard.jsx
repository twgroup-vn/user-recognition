import React, { useState } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getter } from '../assets/Util/object';
import { ProfilePic } from '../assets/Util/profilePic';
import { getAgoTime } from '../assets/Util/time';
import { getPostFormattedMessage } from '../assets/Util/text';
import { getProfileFullName } from '../assets/Util/text';
import FeedCardTitle, { FeedValue } from './FeedComponent';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import classNames from 'classnames';
import axios from 'axios';
import { StoreContext } from '../store/StoreContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const StyledCard = withStyles({
    root: {
        background: '#FFFFFF',
        border: '0.5px solid #EEEEEE',
        boxSizing: 'border-box',
        borderRadius: 2,
        boxShadow: 'none',
        overflow: 'visible',
    }
})(Card);

const useStyles = makeStyles((theme) => ({
    card: {
        // marginLeft: '5px',
        // marginRight: '5px',
        marginBottom: '12px',
    },
    feed_card_header: {
        display: 'flex',
        padding: 16,
        position: 'relative'
    },
    feed_card_title: {
        display: 'inline-block',
        verticalAlign: 'top',
        paddingRight: 45,
        marginLeft: 16
    },
    feed_carrot_value: {
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        right: 4,
        color: '#000',
        fontSize: 18,
        fontWeight: 700
    },
    feed_card_carrots: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        margin: '16px 0',
        padding: 12,
        color: '#2c2c2c'
    },
    feed_carrot_time: {
        color: 'rgba(0,0,0,.54)',
        // fontSize: 14
    },
    feed_card_message: {
        color: '#2c2c2c',
        padding: '0 16px 16px',
        whiteSpace: 'pre-wrap',
        fontWeight: 400,
        // fontSize: 14
    },
    feed_card_action: {
        padding: '0 14px 6px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    iconButton: {
        color: '#9E9E9E',
        '&:focus': {
          outline: 'none',
        },
    },
    commentOn: {
        color: '#0AD71C',
    },
    heartOn: {
        color: '#2772FE',
    },
    privateIcon: {
        marginRight: 5,
    },
    taggedUser: {
        color: 'red',
    },
    username_clickable_to_span: {
        color: '#f40',
        cursor: 'pointer'
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
}));

const renderAvatar = (card) => {
    const feedType = getter(['card', 'type'], card) || 'recognition';
    switch (feedType) {
        case 'recognition':
        default: {
            return (
            <div style={{width: 40, height: 40}}>
                <ProfilePic size={40} user={card.from} />
            </div>
            );
        }
    }
}

const customCompanyIcon = {
    type: 'emoji',
    value: {
        hexCode: "02764",
        id: "heart"
    }
}

function FeedCard(props) {
    const classes = useStyles();
    const { card }= props;
    
    const feedType = getter(['card', 'type'], card) || 'recognition';
    const [didILike, setDidILike] = useState(card.liked);
    const { token } = React.useContext(StoreContext);
    const onFavouriteClick = () => {
        //callAPI
        axios.get(`https://camon.twgroup.vn/api/v1/feed/${card.id}/like`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            }
        }).then((res) => {
            //setCardState(res.data.data);
            setDidILike(!didILike)

        })
    }

    const UserNameComponent = (props) => {
        const {isHovering, users, onUserClicked} = props;
        const usersToShow = Array.from(users);
        const classes = useStyles()
    
        const onClick = (user) => {
            // onUserClicked(user);
        }
        
        return (
            <div className={classes.users_list_container}>
                {card.likes.length > 0 && card.likes.length}
                {
                    isHovering && (
                        <div className={classes.users_list_hover}>
                            <List>
                                {usersToShow.map((user) => (
                                    <ListItem
                                        button
                                        key={user.id}
                                        onClick={() => onClick(user)}
                                    >
                                        <ListItemAvatar>
                                            <ProfilePic size={40} user={user} />
                                        </ListItemAvatar>
                                        <ListItemText primary={getProfileFullName(user)} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <StyledCard key={card.id} className={classes.card}>
            <div className={classes.feed_card_header}>
                {renderAvatar(card)}
                <div className={classes.feed_card_title}>
                    {
                        feedType === 'recognition' ? (
                            <FeedCardTitle
                                to={card.to}
                                from={card.from}
                                badges={card.badges}
                                coreValue={card.coreValue}
                            />
                        ) : (
                            // <FeedAnniversaryTitle to={this.props.card.to} type={feedType} />
                            <div>FeedAnniversaryTitle</div>
                        )
                    }
                    <span className={classes.feed_carrot_time} style={{ display: 'flex', alignItems: 'center' }}>
                        {getAgoTime(card.created_at)}
                    </span>
                </div>
                {card.carrots_each > 0 && (
                    <div className={classes.feed_carrot_value}>
                    <FeedValue
                        customCompanyIcon={customCompanyIcon}
                        value={ card.carrots_each * card.to.length }
                    />
                    </div>
                )}
            </div>
            <div className={classes.feed_card_message}>
                {getPostFormattedMessage(
                    card.message,
                    card.taggedUsers
                    // this.onUserClicked,
                )}
            </div>
            <div className={classes.feed_card_action}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                onClick={onFavouriteClick}
                                className={
                                    didILike
                                    ? classNames(classes.iconButton, classes.heartOn)
                                    : classes.iconButton
                                }
                                component="span"
                                aria-label="Favourite"
                            >
                                <ThumbUpIcon />
                            </IconButton>
                            {
                                card.likes.length > 0 && (
                                    <ReactHoverObserver>
                                        <UserNameComponent
                                            users={card.likes}
                                            // onUserClicked={onUserClicked}
                                        />
                                    </ReactHoverObserver>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </StyledCard>
    )
}

export default FeedCard