import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//lib
import { IconButton, Tooltip, Button, Popover, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AdjustIcon from '@material-ui/icons/Adjust';
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import axios from 'axios';
import classNames from 'classnames';

//emoji
import EmojiIcon from '@material-ui/icons/InsertEmoticon';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

//GIF
import GifIcon from '@material-ui/icons/Gif';
import GiphySelect from 'react-giphy-select';
import 'react-giphy-select/lib/styles.css';

//give-carrot
import DSTypeAhead from './give-carrot/DSTypeAhead';
import ImpactValueSelector from './give-carrot/ImpactValueSelector';
import MessageInput from './give-carrot/MessageInput';
import GiveRecognitionTips from './give-carrot/GiveRecognitionTips';
import BadgesSelector from './give-carrot/BadgesSelector';

//assets
import { getTextFromEditor, getMentionsToReplace } from '../assets/Util/mention';
import { GIVE_RECOGNITION_HEADER } from '../assets/Util/constants';
import { titleize } from '../assets/Util/text';
import { getImageForBadge } from '../assets/Util/BadgesInfo';
import { StyledTabs, StyledTab } from '../components/atom/StyledTabs';

//store
import { StoreContext } from '../store/StoreContext';

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
];

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PostRecognition (props) {
    const classes = useStyles();
    const [slideIndex, setSlideIndex] = useState(0);

    //form value
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [carrots, setCarrots] = useState('');
    const [impact, setImpact] = useState('');
    const [userInputIconOn, setUserInputIconOn] = useState(false);
    const [inputIconOn, setInputIconOn] = useState(false);
    const [inputIconMessageOn, setInputIconMessageOn] = useState(false);
    //end

    const [carrotsTouched, setCarrotsTouched] = useState(false);
    const [carrotError, setCarrotError] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [messageError, setMessageError] = useState(null);
    const [isMessageTipsVisible, setIsMessageTipsVisible] = useState(false);
    const [isRecognitionOpen, setIsRecognitionOpen] = useState(false);

    const [selectedMentions, setSelectedMentions] = useState([]);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEmoji, setAnchorElEmoji] = useState(null);
    const [anchorElGIF, setAnchorElGIF] = useState(null);
    
    //snackbar MAT
    const [openMessage, setOpenMessage] = useState(false);

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMessage(false);
    };

    //store
    const { token, setRemainingPoint } = React.useContext(StoreContext);
    
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

    const handleTypeAheadUsers = (selectedUsers) => {
        setSelectedUsers(selectedUsers);
    };

    const onUserInputFocus = () => {
    }

    const minMessageChar = {
        isSet: false,
        value: 25
    }

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

    const addEmoji = (emoji) => {

        const contentState = editorState.getCurrentContent();
        const targetRange = editorState.getSelection();
        const newContentState = Modifier.insertText(
            contentState,
            targetRange,
            emoji.native,
        );
        const newEditorState = EditorState.push(editorState, newContentState);
        handleCloseEmoji();
        setEditorState(newEditorState);
    }

    
    const onAddBadgeClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onEmojiClick = (event) => {
        setAnchorElEmoji(event.currentTarget);
    }

    const onGIFClick = (event) => {
        event.preventDefault();
        setAnchorElGIF(event.currentTarget);
    }

    const onGIFSelected = (entry) => {
        let mediaAdded = entry.images.downsized_medium.url;

        if (mediaAdded.length === 0) {
            mediaAdded = entry.images.original.url;
        }

        setAnchorElGIF(null);

        // this.setState({
        //     gifOpen: false,
        //     mediaAdded,
        //     mediaType: 'gif',
        // });
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseEmoji = () => {
        setAnchorElEmoji(null);
    };

    const handleCloseGIF = () => {
        setAnchorElGIF(null);
    };
    
    const open = Boolean(anchorEl);
    const openEmoji = Boolean(anchorElEmoji);
    const openGIF = Boolean(anchorElGIF);

    const handleRecognitionTipsToggle = () => {
        setIsRecognitionOpen(!isRecognitionOpen);
    }

    const handleSubmit = (e, values={}) => {
        e.preventDefault();

        const mentionsToReplace = getMentionsToReplace(selectedMentions, mentionUsers)

        const message = getTextFromEditor(editorState, mentionsToReplace)
        // const literalMessage = getLiteralTextFromEditor(editorState);

        //mapping data
        const giveCarrots = {
            to: selectedUsers,
            carrots_each: Number(carrots),
            message,
        }

        if (selectedBadge) {
            giveCarrots.badges = [selectedBadge.name];
        }
        
        //call API
        axios.post('https://camon.twgroup.vn/api/v1/feed', giveCarrots , {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            }
        }).then((res) => {
            if (res.data.data) {
                resetForm();
                //ER-54
                setRemainingPoint(res.data.data.remaining_point);

                setOpenMessage(true);

                //temporative reload page
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        })
    }

    const resetForm = () => {
        setSelectedUsers([]);
        setCarrots('');
        setImpact('');
        setSelectedBadge(null);
        setUserInputIconOn(false);
        setInputIconOn(false);
        setInputIconMessageOn(false);
        setIsMessageTipsVisible(false);
        setIsRecognitionOpen(false);
        setEditorState(EditorState.createEmpty());
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
                            selectedItem={selectedUsers}
                            userInputIconOn={userInputIconOn}
                            onUserInputIconOn={(toggle) => setUserInputIconOn(toggle)}
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
                                    options={impactLevels}
                                    selectedUsers={selectedUsers}
                                    mePointsToGive={mePointsToGive}
                                    carrotsPerPost={carrotsPerPost}
                                    error={carrotError}
                                    canGiveCustomAmount={canGiveCustomAmount && canGivePoints}
                                    canGivePoints={canGivePoints}
                                    onImpactOpen={onImpactOpen}
                                    onImpactClose={onImpactClose}
                                    customCurrency={customCurrency}
                                    customCompanyIcon={customCompanyIcon}
                                    inputIconOn={inputIconOn}
                                    onInputIconOn={(toggle) => setInputIconOn(toggle)}
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
                            minMessageChar={minMessageChar}
                            hasText={messageInputHasText}
                            mentionUsers={mentionUsers}
                            onAddMention={onAddMention}
                            onFocus={handleMessageInputFocus}
                            inputIconMessageOn={inputIconMessageOn}
                            onInputIconMessageOn={(toggle) => setInputIconMessageOn(toggle)}
                        />
                    </div>
                </div>
                {
                    isMessageTipsVisible && (
                        <div className={classes.p_16}>
                            <GiveRecognitionTips
                                isOpen={isRecognitionOpen}
                                onToggleClick={handleRecognitionTipsToggle}
                            />
                        </div>
                    )
                }
                <div className="justify-content-end align-items-center" style={{display: 'flex', padding: 8}}>
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
                        <Tooltip title="Thêm cảm xúc" placement="top">
                            <IconButton
                                className={classes.iconButton}
                                onClick={onEmojiClick}
                                onClose={handleCloseEmoji}
                                aria-label="Thêm cảm xúc"
                            >
                                <EmojiIcon />
                            </IconButton>
                        </Tooltip>
                        {/* <Tooltip title="Add Gif" placement="top">
                            <IconButton
                                onClick={onGIFClick}
                                onClose={handleCloseGIF}
                                className={classes.iconButton}
                                aria-label="Add Gif"
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
                        <Snackbar open={openMessage} autoHideDuration={2000} onClose={handleCloseMessage}>
                            <Alert onClose={handleCloseMessage} severity="success">
                                Bạn đã gửi thành công...
                            </Alert>
                        </Snackbar>
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
                <Popover
                    open={openEmoji}
                    anchorEl={anchorElEmoji}
                    onClose={handleCloseEmoji}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <Picker
                        onClick={addEmoji}
                        native={false}
                        sheetSize={16}
                        set="google"
                        title="Pick your emoji…"
                        emoji="point_up"
                    />
                </Popover>
                <Popover
                    open={openGIF}
                    anchorEl={anchorElGIF}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    onClose={handleCloseGIF}
                >
                    <GiphySelect
                        requestRating='pg-13'
                        requestKey= 'jAE9Ya0RlClP2vSDqo8umIhz14JYKwy4'
                        onEntrySelect={onGIFSelected}
                    />
                </Popover>
            </form>
        </div>
    )
}

export default PostRecognition