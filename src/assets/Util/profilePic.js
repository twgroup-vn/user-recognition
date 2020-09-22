import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { getFirstLetterOfName } from './text';

const useStyles = makeStyles({
    avatar: {
        margin: 10,
    },

    avatarColor: (props) => ({
    color: props.color,
    backgroundColor: props.backgroundColor,
    fontWeight: '600',
    width: props.size ? props.size : 40,
    height: props.size ? props.size : 40,
    fontSize: props.fontSize,
    }),

    avatarImage: (props) => ({
    width: props.size ? props.size : 40,
    height: props.size ? props.size : 40,
    }),
})

const UserNameAvatar = (props) => {
    const { user, size } = props;
    const firstLetter = user.isDeleted ? 'D' : getFirstLetterOfName(user);
    const colorProp = user.isDeleted ? { bg: '#FFF0A2', color: '#FFE145' } : getColor(user);
    let fontSize = 18;
    if (size === 30 || size === 32) {
      fontSize = 14;
    } else if (size === 88) {
      fontSize = 36;
    }
    const styleProps = {
      backgroundColor: colorProp.bg,
      color: colorProp.color,
      size,
      fontSize,
    };
    const classes = useStyles(styleProps);
  
    return <Avatar className={classes.avatarColor}>{firstLetter}</Avatar>;
};

export const ProfilePic = (props) =>  {
    const { user, size } = props;
    const classes = useStyles({ size });
    if (user &&
        user.profile &&
        user.profile.image &&
        user.profile.image.original.relativeUrl) {
            return (
                <Avatar src={user.profile.image.original.relativeUrl} className={classes.avatarImage} />
            )
    } else {
        return (
            <UserNameAvatar user={user} size={size} />
        )
        
    }
}

export const getColor = (user) => {
    let lastChar = 'p';
    if (user && user._id) {
        lastChar = user._id.substr(user._id.length - 1);
    }
    const charCode = lastChar.charCodeAt(0);
    let bg = '#FFBBA2';
    let color = '#FF7745';
    switch (charCode) {
        case 97:
        case 113:
        case 103:
        case 119:
        case 49:
        case 111:
        bg = '#FFBBA2';
        color = '#FF7745';
        break;
        case 98:
        case 114:
        case 104:
        case 120:
        case 50:
        case 57:
        bg = '#E6D3FD';
        color = '#CDA7FC';
        break;
        case 99:
        case 115:
        case 106:
        case 122:
        case 52:
        case 112:
        bg = '#A6F8AD';
        color = '#4DF15A';
        break;
        case 100:
        case 116:
        case 105:
        case 121:
        case 51:
        case 108:
        bg = '#FFF0A2';
        color = '#FFE145';
        break;
        case 101:
        case 117:
        case 107:
        case 53:
        case 110:
        case 56:
        case 54:
        bg = '#FFA3C7';
        color = '#FF478F';
        break;
        case 102:
        case 118:
        case 48:
        case 109:
        case 55:
        bg = '#A2F5FF';
        color = '#45EBFF';
        break;
        default:
        bg = '#A2F5FF';
        color = '#45EBFF';
        break;
    }
    return {
        bg,
        color,
    };
}