import {
  CHATROOM_FRAGMENT
} from "../../fragments";

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
        roomId,
        message,
        toId
      } = args;
      let room;
      if (roomId === undefined) {
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
          id: roomId
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
            id: roomId ? getTo.id : toId
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