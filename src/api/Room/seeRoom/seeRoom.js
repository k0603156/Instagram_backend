import {
  CHATROOM_FRAGMENT
} from "../../../fragments";

export default {
  Query: {
    seeChatRoom: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      const {
        id
      } = args;
      const {
        user
      } = request;
      const canSee = await db.$exists.chatRoom({
        participants_some: {
          id: user.id
        }
      });
      if (canSee) {
        return await db.chatRoom({
          id
        }).$fragment(CHATROOM_FRAGMENT);

      } else {
        throw Error("You can't see this");
      }
    }
  }
}