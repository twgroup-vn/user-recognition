import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CustomEditor from '../V2/CustomEditor';

// import Fuse from 'fuse.js';
// import { getter } from '../../assets/Util/object';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '31px',
    },
    iconStyle: {
        fontSize: '16px',
        cursor: 'pointer',
    },
    iconInactiveStyle: {
        color: '#9e9e9e',
        filter: 'grayscale(1)',
    },
    iconActiveStyle: {
        color: theme.palette.secondary.main,
        filter: 'grayscale(0)',
    },
    inputDiv: {
        marginTop: 7,
        width: '100%',
        flexDirection: 'column',
        verticalAlign: 'top',
        fontSize: '16px',
        overflow: 'hidden',
    },
    errorhelper: {
        color: '#f44336',
        margin: 0,
        fontSize: '0.75rem',
        marginTop: 3,
        textAlign: 'left',
        fontWeight: 400,
        lineHeight: 1.66,
    },
    textarea__input: {
        width: '100%'
    },
    // textarea__input__input::-webkit-input-placeholder {
    //     color: #e2e2e2 !important; }
}))

const DIV_ID = 'gr_post_div';

function MessageInput(props) {
    //const [inputIconOn, setInputIconOn] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { inputIconMessageOn, onInputIconMessageOn } = props;
    const [editor, setEditor] = useState();
    const classes = useStyles();

    const onFocus = () => {
        onInputIconMessageOn(true);
        editor.focus();
        props.onFocus();
    }

    const onChange = (editorState) => {
        props.handleMessage(editorState)
    }

    const onInputBlur = () => {

        if(props.hasText) {
            onInputIconMessageOn(true);
        }
        
        else {
            onInputIconMessageOn(false);
        }
    }

    const onSearchChange = () => {

    }

    const onOpenSuggestions = () => {

    }

    const onCloseSuggestions = () => {

    }

    const onAddMention = () => {

    }
    
    const getErrorMessage = () => {

    }

    return (
        <div className={classes.root}>
            <div className={classes.iconWrapper}>
                <div className={classNames(
                    classes.iconStyle,
                    inputIconMessageOn ? classes.iconActiveStyle : classes.iconInactiveStyle
                )}
                    onClick={onFocus}
                >
                    <span role="img" aria-label="icon">
                        💌
                    </span>
                </div>
            </div>
            <div className={classes.inputDiv}>
                <div
                    onClick={onFocus}
                    className={classNames(classes.textarea__input, DIV_ID)}
                >
                    <CustomEditor
                        editorState={props.editorState}
                        onChange={onChange}
                        editorRef={(e) => {
                            setEditor(e)
                        }}
                        onBlur={onInputBlur}
                        onFocus={onFocus}
                        placeholder="Hãy viết những lời ý nghĩa gửi đến người đó"
                        onSearchChange={onSearchChange}
                        onAddMention={onAddMention}
                        suggestions={suggestions}
                        onOpenSuggestions={onOpenSuggestions}
                        onCloseSuggestions={onCloseSuggestions}
                    />
                </div>
                {props.error && (
                    <div className={classes.errorhelper}>{getErrorMessage()}</div>
                )}
            </div>
        </div>
    )
}
export default MessageInput