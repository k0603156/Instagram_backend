import {
  CHATROOM_FRAGMENT
} from "../../../fragments";

export default {
  Query: {
    seeRooms: async (_, __, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        user
      } = request;
      return db.chatRooms({
        where: {
          participants_some: {
            id: user.id
          }
        }
      }).$fragment(CHATROOM_FRAGMENT);
    }
  }
}