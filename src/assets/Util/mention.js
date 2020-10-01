import { convertToRaw } from 'draft-js';

const getLiteralTextFromEditor = (editorState = []) => {
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;

  const mappedBlocks = blocks.map(
    (block) => (!block.text.trim() && '\n') || block.text,
  );

  let newText = '';
  for (let i = 0; i < mappedBlocks.length; i++) {
    const block = mappedBlocks[i];

    // handle last block
    if (i === mappedBlocks.length - 1) {
      newText += block;
    } else {
      // otherwise we join with \n, except if the block is already a \n
      if (block === '\n') newText += block;
      else newText += block + '\n';
    }
  }
  return newText;
};

const getTextFromEditor = (editorState, mentionsToReplace = []) => {
  let newText = getLiteralTextFromEditor(editorState);
  mentionsToReplace.forEach((mention) => {
    newText = newText.replace(
      new RegExp(mention.name, 'g'),
      `@__${mention.id}__@`,
    );
  });
  return newText;
};

const getMentionsToReplace = (selectedMentions, employees) => {
  
  return selectedMentions.map((id) => {
    const employee = employees.find((emp) => emp.id === id);
    return {
      id,
      name: employee.name || '',
    };
  });
};

const getMentionsFromEditorSate = (editorState, mentions) => {
  const userIdsMentioned = [];
  const message = getLiteralTextFromEditor(editorState);
  mentions.forEach((mention) => {
    if ((message.match(new RegExp(mention.name, 'g')) || []).length > 0) {
      userIdsMentioned.push(mention.id);
    }
  });
  return userIdsMentioned;
};

export {
  getTextFromEditor,
  getMentionsToReplace,
  getLiteralTextFromEditor,
  getMentionsFromEditorSate,
};
