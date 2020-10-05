import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getter } from '../assets/Util/object';
import { ProfilePic } from '../assets/Util/profilePic';
import { getAgoTime } from '../assets/Util/time';
import { getPostFormattedMessage } from '../assets/Util/text';
import FeedCardTitle, { FeedValue } from './FeedComponent';
import Card from '@material-ui/core/Card';

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
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '10px',
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
        fontSize: 14
    },
    feed_card_message: {
        color: '#2c2c2c',
        padding: '0 16px 16px',
        whiteSpace: 'pre-wrap',
        fontWeight: 400,
        fontSize: 14
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
    // const [showEnterComment, setShowEnterComment] = useState();
    // const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    // const [isRemoveMediaAlertOpen, setIsRemoveMediaAlertOpen] = useState(false);
    // const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
    const { card } = props;
    const feedType = getter(['card', 'type'], card) || 'recognition';
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
                {/* {mediaUrl && mediaUrl.length > 0 && isImage ? (
                    <div className="feed-image__div">
                        <Img className="media__Image" alt="media" src={mediaUrl} />
                    </div>
                    ) : (
                    <div className="feed-media__div">
                        <Img className="media__Image" alt="media" src={mediaUrl} />
                    </div>
                )} */}
                
            </div>
            <div className={classes.feed_card_message}>
                {getPostFormattedMessage(
                    card.message,
                    card.taggedUsers
                    // this.onUserClicked,
                )}
            </div>
        </StyledCard>
    )
}

export default FeedCard