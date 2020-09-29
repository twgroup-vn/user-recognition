import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ProfilePic } from '../../assets/Util/profilePic';

const useStyles = makeStyles(() => ({
    user: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        fontSize: '16px',
        fontWeight: 'normal',
        b: {
          fontWeight: 'normal',
        },
    },
    userId: {
        fontSize: '12px',
        fontWeight: 'normal',
    },
    autocomplete_user_fullname: {
        paddingLeft: 8,
        fontSize: 12,
        color: '#2C2C2C',
        fontWeight: 600,
        letterSpacing: 0.2
    },
}));

const Entry = (props) => {
    const {...parentProps} = props;
    const classes = useStyles();
    return (
        <div {...parentProps}>
            <div className={classes.user}>
                <ProfilePic size={32} user={props.mention} />
                <span className={classes.autocomplete_user_fullname}>
                    <div className={classes.userName}>{props.mention.name}</div>
                    <div className={classes.userId}>
                        {`@${props.mention.username}`}
                    </div>
                </span>
            </div>
        </div>
    )
}
function CustomMentionSuggesstions(props) {
    const { onSearchChange, suggestions, onOpenSuggestions, onCloseSuggestions, onAddMention, MentionComponent } = props;
    return (
        <MentionComponent 
            onSearchChange={onSearchChange}
            suggestions={suggestions}
            onOpen={onOpenSuggestions}
            onClose={onCloseSuggestions}
            entryComponent={Entry}
            onAddMention={onAddMention}
        />
    )
    
    
}

export default CustomMentionSuggesstions