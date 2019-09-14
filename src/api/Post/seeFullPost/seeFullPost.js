import {
  COMMENT_FRAGMENT,
  FULL_POST_FRAGMENT
} from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args, {
      db
    }) => {
      const {
        id
      } = args;
      return db.post({
        id
      }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};