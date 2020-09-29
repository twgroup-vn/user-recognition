import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import CustomMentionSuggestions from './CustomMentionSuggesstions';

function CustomEditor(props) {
    // const {
    //     editorState,
    //     onChange,
    //     editorRef,
    //     onBlur,
    //     onFocus,
    //     placeholder,
    //     onSearchChange,
    //     suggestions,
    //     onOpenSuggestions,
    //     onCloseSuggestions,
    //     onAddMention,
    //   } = this.props;
    const mentionPlugin = createMentionPlugin({
        entityMutability: 'IMMUTABLE',
        mentionTrigger: '@',
        supportWhitespace: true,
    })

    const { MentionSuggestions } = mentionPlugin;

    return (
        <>
            <Editor
                editorState={props.editorState}
                onChange={props.onChange}
                plugins={[mentionPlugin]}
                ref={props.editorRef}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                placeholder={props.placeholder}
            />
            <CustomMentionSuggestions
                onSearchChange={props.onSearchChange}
                suggestions={props.suggestions}
                MentionComponent={MentionSuggestions}
                onOpenSuggestions={props.onOpenSuggestions}
                onCloseSuggestions={props.onCloseSuggestions}
                onAddMention={props.onAddMention}
            />
        </>
    )
}
export default CustomEditor;