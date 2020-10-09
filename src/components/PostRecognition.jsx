import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AdjustIcon from '@material-ui/icons/Adjust';
import classNames from 'classnames';
import { IconButton, Tooltip, Button, Popover } from '@material-ui/core';
import { titleize } from '../assets/Util/text';
// import EmojiIcon from '@material-ui/icons/InsertEmoticon';
// import CameraIcon from '@material-ui/icons/AddAPhoto';
// import GifIcon from '@material-ui/icons/Gif';
import { getImageForBadge } from '../assets/Util/BadgesInfo';
import DSTypeAhead from './give-carrot/DSTypeAhead';
import ImpactValueSelector from './give-carrot/ImpactValueSelector';
import MessageInput from './give-carrot/MessageInput';
import { EditorState, convertToRaw } from 'draft-js';
import { getTextFromEditor, getMentionsToReplace } from '../assets/Util/mention';
import { GIVE_RECOGNITION_HEADER } from '../assets/Util/constants';
import axios from 'axios';
import BadgesSelector from './give-carrot/BadgesSelector';

const StyledTabs = withStyles({
    root: {
        background: '#f6f6f6'
    },
    indicator: {
      backgroundColor: '#EEEEEE',
    },
})(Tabs);

const StyledTab = withStyles(() => ({
    root: {
        textTransform: 'none',
        color: '#2C2C2C',
        // fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: '.5px',
        '&:focus': {
        outline: 'none'
        }
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    post_container: {
        border: '.5px solid #EEEEEE',
        background: '#FFFFFF',
        borderRadius: 2,
        marginBottom: 10,
    },
    form_container: {
        position: 'relative',
        width: '100%'
    },
    p_16: {
        padding: 16
    },
    input_row_style: {
        position: 'relative',
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
    },
    iconButton: {
        color: '#9E9E9E',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    button: {
        color: '#FFFFFF',
        borderRadius: 4,
        minWidth: 140,
        // boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        '&$disabled': {
          boxShadow: 'none',
        },
        textTransform: 'none',
    },
    gc_button: {
        marginLeft: 10,
        marginRight: 10
    },
    add_emoji_img: {
        width: 20,
        height: 20
    }
}));

const impactLevels = [
    {
        goldLimit: 10,
        label: "🙂",
        value: "small"
    },
    {
        goldLimit: 20,
        label: "😀",
        value: "medium"
    },
    {
        goldLimit: 30,
        label: "👏",
        value: "large"
    },
    {
        goldLimit: 40,
        label: "💪",
        value: "huge"
    },
    {
        goldLimit: 50,
        label: "🚀",
        value: "above"
    }
]
function PostRecognition (props) {
    const classes = useStyles();
    const [slideIndex, setSlideIndex] = useState(0);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [carrots, setCarrots] = useState('');
    const [impact, setImpact] = useState('');
    const [carrotsTouched, setCarrotsTouched] = useState(false);
    const [carrotError, setCarrotError] = useState(null);
    // const [ internalTourState, setInternalTourState] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [messageError, setMessageError] = useState(null);
    const [isMessageTipsVisible, setIsMessageTipsVisible] = useState(false);
    const [selectedMentions, setSelectedMentions] = useState([]);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    //token
    const [token, setToken] = useState('')

    //hardcode
    const canGivePoints = true;

    const canGiveCustomAmount = false;

    const badgeAttachability = true;

    const mePointsToGive = 200;

    const carrotsPerPost = {
        isSet: false,
        value: 25
    }

    const customCurrency = {
        NAME_PLURAL: "Trophies",
        NAME_TITLEIZED: "Trophy",
        NAME_TITLEIZED_PLURAL: "Trophies"
    }

    const customCompanyIcon = {
        type: 'emoji',
        value: {
            hexCode: "02764",
            id: "heart"
        }
    }

    /*
        get TOKEN
    */
    useEffect(() => {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const emailLogin = urlParams.get('email')

        axios.post(`https://camon.twgroup.vn/api/v1/auth/user?email=${emailLogin}`)
        .then((res) =>{
            setToken(res.data.data.token);
            //TODO
            sessionStorage.setItem('id', res.data.data.user.id);
            sessionStorage.setItem('token', res.data.data.token);
            sessionStorage.setItem('points_earned', res.data.data.user.points_earned);
            sessionStorage.setItem('remaining_point', res.data.data.user.remaining_point);
        })
    },[])

    const handleTabChange = (event, newValue) => {
        setSlideIndex(newValue);
    };

    const getImageForBadgeIcon = () => {
        if (selectedBadge) {
            return getImageForBadge(selectedBadge, true);
        }

    };

    const getImageTitleForBadge = () => {
        
        if (selectedBadge) {
            return selectedBadge.displayName;
        }
        return 'Danh hiệu';
    };

    const handleTypeAheadUsers = (selectedUsersProps) => {
        setSelectedUsers(selectedUsersProps);
    };

    const onUserInputFocus = () => {
    }

    const minMessageChar = {
        isSet: false,
        value: 25
    }
    // const onUserInputBlur = () => {

    // }

    const onImpactOpen = () => {
        props.switchBalanceTab(1);
    }

    const onImpactClose = () => {
        props.switchBalanceTab(0);
    }

    const handleImpactValueChange = (impact, carrots) => {
        setImpact(impact);
        setCarrots(carrots);
        setCarrotsTouched(true);
    }

    const handleMessage = (editorStateProps) => {
        setEditorState(editorStateProps);
        setMessageError(null);
    }

    const handleMessageInputFocus = () => {
        setIsMessageTipsVisible(true);
      };

    const onAddMention = (props) => {
        selectedMentions.push(props.id);
        setSelectedMentions(selectedMentions);
    };

    const messageInputHasText = editorState.getCurrentContent().hasText();
    const mentionUsers = [
        {
            "id": "5f60a577937a424a11ee2b36",
            "_id": "5f60a577937a424a11ee2b36",
            "name" : "Minh Y Nguyen",
            "username": "minh-y-nguyen",
            "profile": {
                "firstName": "Minh Y",
                "lastName": "Nguyen",
                "username": "minh-y-nguyen",
                "allowanceType": "regular",
                "status": "normal"
            },
            "role": [
                "Employee"
            ]
        }
    ]

    
    const shouldDisableGiveButton = () => {
        let giveButtonDisabled = true;
        
        // const { canGivePoints, mePointsToGive } = props; //hardcode
        
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks[0].text.trim();
        
        const hasText = editorState.getCurrentContent().hasText();

        if (isFormSubmitting) {
            giveButtonDisabled = true;
        } else if (selectedUsers.length > 0  && hasText && value !== '') {
            if(!carrotError) {
                if(!canGivePoints || Number(mePointsToGive) === 0) {
                    giveButtonDisabled = true;
                }
                else if(canGivePoints && carrotsTouched) {
                    if (selectedUsers.length * carrots <= mePointsToGive) {
                        giveButtonDisabled = false;
                    }
                }
            }
        }

        return giveButtonDisabled;
    }

    const giveButtonDisabled = shouldDisableGiveButton();

    const onUpdateSelectedBadge = (badge) => {
        if(selectedBadge) {
            if(selectedBadge.name === badge.name) {
                setSelectedBadge(null);
                setAnchorEl(null);
                return
            }
        }
        setSelectedBadge(badge);
        setAnchorEl(null);
    }

    const onAddBadgeClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);

    const handleSubmit = (e, values={}) => {
        e.preventDefault();

        const mentionsToReplace = getMentionsToReplace(selectedMentions, mentionUsers)

        const message = getTextFromEditor(editorState, mentionsToReplace)
        // const literalMessage = getLiteralTextFromEditor(editorState);

        //mapping data
        const giveCarrots = {
            to: selectedUsers.map((user) => user.id),
            carrots_each: Number(carrots),
            message,
        }

        if (selectedBadge) {
            giveCarrots.badges = [selectedBadge.name];
        }

        // if(impact) {
        //     giveCarrots.postImpact = props.impactData.find((item) => item.name === impact)
        // }

        // this.setState({
        //     isFormSubmitting: true,
        //     isRecognitionOpen: false,
        //     isMessageTipsVisible: false,
        // });

        console.log(giveCarrots)
        //call API
        axios.post('https://camon.twgroup.vn/api/v1/feed', giveCarrots , {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            }
        }).then((res) => {
            console.log(res.data.data)
            
        })

    }

    return (
        <div className={classes.post_container}>
            <div style={{overflow: 'hidden', width: 'calc(100% - 1px)'}}>
                <StyledTabs
                    centered
                    variant='fullWidth'
                    value={slideIndex}
                    onChange={handleTabChange}>
                    <StyledTab disableRipple label= {GIVE_RECOGNITION_HEADER} />
                </StyledTabs>
            </div>
            <form onSubmit={handleSubmit} className={classes.form_container}>
                <div className={classes.p_16}>
                    <div
                        className={classNames(
                            'row',
                            'shoutout-user-select',
                            classes.input_row_style,
                        )}
                    >
                        <DSTypeAhead
                            handleUsers={handleTypeAheadUsers}
                            onFocus={onUserInputFocus}
                            // onBlue={onUserInputBlur}
                        />
                    </div>
                    {
                        canGivePoints && (
                            <div className={classNames(
                                'row',
                                'shoutout-user-select',
                                classes.input_row_style,
                            )}>
                                <ImpactValueSelector
                                    carrots={carrots}
                                    impact={impact}
                                    onChange={handleImpactValueChange}
                                    options={impactLevels}//hard
                                    selectedUsers={selectedUsers}//hard
                                    mePointsToGive={mePointsToGive}//hard
                                    carrotsPerPost={carrotsPerPost}//setting
                                    error={carrotError}
                                    canGiveCustomAmount={canGiveCustomAmount && canGivePoints}//hard
                                    canGivePoints={canGivePoints}
                                    onImpactOpen={onImpactOpen}
                                    onImpactClose={onImpactClose}
                                    customCurrency={customCurrency}//hard
                                    customCompanyIcon={customCompanyIcon}//hard
                                />
                            </div>
                        )
                    }
                    <div className={classNames(
                                'row',
                                'shoutout-user-select',
                                classes.input_row_style,
                    )}>
                        <MessageInput
                            handleMessage={handleMessage}
                            editorState={editorState}
                            error={messageError}
                            minMessageChar={minMessageChar}//hard
                            hasText={messageInputHasText}//hard
                            mentionUsers={mentionUsers}//hard
                            onAddMention={onAddMention}
                            onFocus={handleMessageInputFocus}
                        />
                    </div>
                </div>
                <div className="justify-content-end align-items-center" style={{display: 'flex', padding: 14}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {
                            badgeAttachability && (
                                <Tooltip title='Danh hiệu' placement='top'>
                                    <IconButton
                                        className={classes.iconButton}
                                        aria-label='Danh hiệu'
                                        onClick={onAddBadgeClick}
                                    >
                                        {
                                            selectedBadge ? (
                                                <img
                                                    className={classes.add_emoji_img}
                                                    alt='badges'
                                                    title={getImageTitleForBadge(selectedBadge)}
                                                    src={getImageForBadgeIcon(selectedBadge)} />
                                            ) : (
                                            <AdjustIcon /> )
                                        }
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        {/* <Tooltip title="Biểu tượng cảm xúc" placement="top">
                            <IconButton
                                className={classes.iconButton}
                                // onClick={onEmojiClick}
                                aria-label="Biểu tượng cảm xúc"
                            >
                                <EmojiIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Hình ảnh" placement="top">
                            <IconButton
                                color="primary"
                                className={classes.iconButton}
                                component="span"
                                aria-label="Hình ảnh"
                            >
                                <CameraIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Gif" placement="top">
                            <IconButton
                                // onClick={onGifClick}
                                className={classes.iconButton}
                                aria-label="Gif"
                            >
                                <GifIcon />
                            </IconButton>
                        </Tooltip> */}
                    </div>
                    <div className={classes.gc_button}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            type="submit"
                            disabled={giveButtonDisabled}
                        >
                            {
                            /* {givePrivately
                            ? 'Give Privately'
                            : titleize(GIVE_RECOGNITION)} */

                            titleize('gửi lời cảm ơn')}
                        </Button>
                    </div>
                </div>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <BadgesSelector 
                        updateSelected={(badge) => onUpdateSelectedBadge(badge)}
                        selectedBadge={selectedBadge}
                    />
                </Popover>
            </form>
        </div>
    )
}

export default PostRecognition