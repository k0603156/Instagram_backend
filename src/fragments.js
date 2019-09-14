// export const USER_FRAGMENT = `
// fragment UserParts on User{
//   id
//   userName
//   email
//   firstName
//   lastName
//   bio
//   posts {
//     id
//     caption
//   }
// }`;
//me.js
export const USER_FRAGMENT = `
  id
  userName
  avatar
`;

export const COMMENT_FRAGMENT = `
  id
  text
  user {
    ${USER_FRAGMENT}
  }
`;

export const FILE_FRAGMENT = `
  id
  url
`;

export const FULL_POST_FRAGMENT = `
fragment PostParts on Post {
  id
  location
  caption
  user {
    ${USER_FRAGMENT}
  }
  files {
    ${FILE_FRAGMENT}
  }
  comments {
    ${COMMENT_FRAGMENT}
  }
}`;
export const CHATROOM_FRAGMENT = `fragment RoomParts on ChatRoom {
  id
  participants {
    ${USER_FRAGMENT}
  }
}`