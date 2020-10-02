import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AdjustIcon from '@material-ui/icons/Adjust';
import classNames from 'classnames';
import { IconButton, Tooltip, Button } from '@material-ui/core';
import { titleize } from '../assets/Util/text';
import EmojiIcon from '@material-ui/icons/InsertEmoticon';
import CameraIcon from '@material-ui/icons/AddAPhoto';
import GifIcon from '@material-ui/icons/Gif';
import { getImageForBadge } from '../assets/Util/BadgesInfo';
import DSTypeAhead from './give-carrot/DSTypeAhead';
import ImpactValueSelector from './give-carrot/ImpactValueSelector';
import MessageInput from './give-carrot/MessageInput';
import { EditorState, Modifier } from 'draft-js';
import { getTextFromEditor, getMentionsToReplace, getLiteralTextFromEditor } from '../assets/Util/mention';
import { GIVE_RECOGNITION_HEADER } from '../assets/Util/constants';
import axios from 'axios';

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
        fontSize: 14,
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
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        '&$disabled': {
          boxShadow: 'none',
        },
        textTransform: 'none',
    },
    gc_button: {
        marginLeft: 10,
        marginRight: 10
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


    const handleTabChange = (event, newValue) => {
        setSlideIndex(newValue);
    };

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

    const getImageForBadgeIcon = () => {

        if (selectedBadge) {
          return getImageForBadge(selectedBadge, true);
        }
        
    };
    
    const getImageTitleForBadge = () => {

        if (selectedBadge) {
            return selectedBadge.displayName;
        }
        return 'Add Badge';
    };

    const handleTypeAheadUsers = (selectedUsersProps) => {
        // const { runHomeTour, canGivePoints } = this.props;
        // const { tourStep } = this.state;
        // if (runHomeTour && tourStep === TOUR_STEPS.SELECT_USER) {
        // let nextStep = TOUR_STEPS.SELECT_CARROTS;
        // if (!canGivePoints) nextStep = TOUR_STEPS.ADD_MESSAGE;
        //     this.setState({
        //         selectedUsers,
        //         tourStep: nextStep,
        //         internalTourState: null,
        //     });
        // }
        // else {
            // this.setState({ selectedUsers });
        //}
        setSelectedUsers(selectedUsersProps);
    };

    const onUserInputFocus = () => {
        // const { runHomeTour } = this.props;
        // const { internalTourState, tourStep } = this.state;
        // if (runHomeTour && tourStep === TOUR_STEPS.SELECT_USER) {
        //     if (internalTourState !== 'paused') {
        //       setInternalTourState('pause')
        //     }
        // }
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
        // const { selectedMentions } = this.state;
        // selectedMentions.add(props.id);
        // this.setState({ selectedMentions });
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
        // const {
        //     isFormSubmitting,
        //     selectedUsers,
        //     editorState,
        //     carrotError,
        //     carrotsTouched,
        //     carrots,
        // } = this.state;
        const { canGivePoints, mePointsToGive } = props;
        const hasText = editorState.getCurrentContent().hasText();

        if (isFormSubmitting) {
            giveButtonDisabled = true;
        }

        else if(selectedUsers.length > 0 && hasText) {
            if(!carrotError) {
                if (!canGivePoints || Number(mePointsToGive) === 0) {
                    giveButtonDisabled = false;
                }
                else if (canGivePoints && carrotsTouched) {
                    if (selectedUsers.length * carrots <= mePointsToGive) {
                      giveButtonDisabled = false;
                    }
                }
            }
        }

        return giveButtonDisabled;
    }

    const giveButtonDisabled = shouldDisableGiveButton();

    const handleSubmit = (e, values={}) => {
        e.preventDefault();

        const mentionsToReplace = getMentionsToReplace(selectedMentions, mentionUsers)

        const message = getTextFromEditor(editorState, mentionsToReplace)
        const literalMessage = getLiteralTextFromEditor(editorState);

        //mapping data
        const giveCarrots = {
            to: selectedUsers.map((user) => user._id),
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
                'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjE0NWRjNGI3LWQyODEtNDIzNi1hZjYwLWM2MmI3NDk3YmVjYSIsImVtYWlsIjoicGhhdGx0QHR3Z3JvdXAudm4ifQ.Ft8bNFXhOSbFneB_A4_zqzM3QMpzOEpHUo-OuAOJAC-nDqb3M1S0mGtqcMhadbdP8LP0fws9ecK3FNgvazKf1btp6Ojg5hCxORy2Wc8LAohb_cl4T3_DKy44XvYkVKM8zX61WLud2yUcTrpe46cbX80n6ItahSNvvQNtR0j_x-BzeaSr0MX13hrftKqGdFZGG6NKOS9THEHzNLXhkcG3m4vxXv3rNPyeDMQIimw3EF2FNjBNhZJff2Dj0_QtullEm26hf4NrS5ZjZBPJJo6SgSH7-M4hrOtPTAhLB0_QsBJm6W4Oq9OYd-cxe470WpeSz1TIPuVLJV9TEKW95lcDK-SXBH781xwxvr3WLpbK7qe-RdGnEOl1ymnoJAH7TpIWCAsiVUOmob3xjUDrvuylLACQ43k5sfh4au9vch9-AIR74US0uIdJZGfnPeUGc4QMz8rrlztnRhdvLBwErWkqg-lebjICvWg-5GQm6FPmpalNxTBB1QX20B-3Hg1hr8LqiptVWhn6156DSRwxjLCgyaQrsq707fseYZbKDRi35VVus9dMhCTVlQ11SH2TLOpd8n1EeHsL3ESObtdXzNFrVKgKAVnQawWnYM1ZEim4yzaVBbHgKqB2QKCupdj-U6pMH0oVA8t1se0RuRMageF4_TRlAnOC1Oq2z0Lhmv_VAlI'
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
                    {/* {coreValuesSetStatus && coreValues.length !== 0 && (
                        <div
                            className={classNames(
                            'row',
                            'shoutout-corevalue-select',
                            classes.inputRowStyle,
                            )}
                        >
                            <CoreValueSelector
                            value={this.state.coreValue}
                            onChange={this.handleCoreValue}
                            options={coreValues}
                            />
                        </div>
                    )} */}
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
                        {/* {canGivePrivateMessage && (
                            <Tooltip title="Give Privately" placement="top">
                            <IconButton
                                className={classNames(classes.iconButton, {
                                [classes.iconButtonOn]: this.state.givePrivately,
                                })}
                                onClick={this.onGivePrivateClick}
                                aria-label="Give Privately"
                            >
                                <VisibilityIcon />
                            </IconButton>
                            </Tooltip>
                        )} */}
                        {
                            badgeAttachability && (
                                <Tooltip title='Danh hiệu' placement='top'>
                                    <IconButton className={classes.iconButton} aria-label='Danh hiệu'>
                                        {
                                            selectedBadge ? (
                                                <img
                                                    className='add-emoji-img'
                                                    alt='badges'
                                                    title={() => getImageTitleForBadge()}
                                                    src={() => getImageForBadgeIcon()} />
                                            ) : (
                                            <AdjustIcon /> )
                                        }
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        <Tooltip title="Biểu tượng cảm xúc" placement="top">
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
                        </Tooltip>
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
            </form>
        </div>
    )
}

// PostRecognition = reduxForm({
//     form: 'giveCarrotsForm', // a unique name for this form
// })(PostRecognition);

export default PostRecognition