import {
  CHATROOM_FRAGMENT
} from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        user
      } = request;
      const {
        chatRoomId,
        message,
        toId
      } = args;
      let room;
      if (chatRoomId === undefined) {
        if (user.id !== toId) {
          room = await db.createChatRoom({
            participants: {
              connect: [{
                id: toId
              }, {
                id: user.id
              }]
            }
          }).$fragment(CHATROOM_FRAGMENT);
        }

      } else {
        room = await db.chatRoom({
          id: chatRoomId
        }).$fragment(CHATROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      )[0];
      return db.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: chatRoomId ? getTo.id : toId
          }
        },
        chatRoom: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};