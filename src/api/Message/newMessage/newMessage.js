export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args, {
        db
      }) => {
        const {
          chatRoomId
        } = args;
        return db.$subscribe.message({
          AND: [{
              mutation_in: "CREATED"
            },
            {
              node: {
                chatRoom: {
                  id: chatRoomId
                }
              }
            }
          ]
        }).node();
      },
      resolve: payload => payload
    }
  }
}