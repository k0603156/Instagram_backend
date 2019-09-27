export default {
  ChatRoom: {
    participants: ({
      id
    }, _, {
      db
    }) => db.chatRoom({
      id
    }).participants(),
    messages: ({
      id
    }, _, {
      db
    }) => db.chatRoom({
      id
    }).messages()
  }
};