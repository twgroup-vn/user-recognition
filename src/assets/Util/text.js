import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';
// import _ from 'lodash';

export const CASHOUT_TITLE_TEXT_MAX_LENGTH = 35;
export const MENTION_REGEX = /@__(.*?)__@/;

export const getProfileFullName = (user) => {
    if (user && user.profile) {
        if (user.profile.first_name !== null && user.profile.last_name === null) {
            return `${user.profile.first_name}`;
        }

        if (user.profile.last_name !== null && user.profile.first_name === null) {
            return `${user.profile.last_name}`;
        }

        if (user.profile.last_name && user.profile.first_name ) {
            return `${user.profile.first_name} ${user.profile.last_name}`;
        }

    }
    return '';
};

export const getFirstLetterOfName = (user) => {
  if (user && user.profile && user.profile.first_name) {
    return `${user.profile.first_name.slice(0, 1).toUpperCase()}`;
  }
  return '';
};

export const titleize = (input) => {
  if (typeof input !== 'string') {
		throw new TypeError('Expected a string');
	}

	return input.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

export const getPostFormattedMessage = (text, taggedUsers) => {
    let replacedText = text;
    
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
        <span key={match + i} className="feed-card-hashtag">
        #{match}
        </span>
    ));

    replacedText = reactStringReplace(replacedText, /:(.*?):/g, (match, i) => (
        <Emoji key={match + i} emoji={`:${match}:`} size={16} />
    ));
  
    if (taggedUsers) {
        if (taggedUsers.length > 0) {
            replacedText = reactStringReplace(
            replacedText,
            MENTION_REGEX,
            (match, i) => {
                const filteredEmployeeArr = taggedUsers.filter((employee) => employee._id === match).map((employee) => {
                // if (onUserClicked) {
                //   return (
                //     <span
                //       key={match + i}
                //       className={
                //         employee.isDeleted
                //           ? 'noEvent deactivated_user'
                //           : 'feed-card-mention'
                //       }
                //       onClick={
                //         !employee.isDeleted
                //           ? () => {
                //               onUserClicked(employee);
                //             }
                //           : null
                //       }
                //     >
                //       {employee.isDeleted
                //         ? 'Deactivated User'
                //         : getProfileFullName(employee)}
                //     </span>
                //   );
                // }
                    return (
                        <span key={match + i}>
                            <b>
                                {employee.isDeleted
                                    ? 'Deactivated User'
                                    : getProfileFullName(employee)
                                }
                            </b>
                        </span>
                    );
                });
                    return filteredEmployeeArr;
                },
            );
        }
    }
    return replacedText;
};