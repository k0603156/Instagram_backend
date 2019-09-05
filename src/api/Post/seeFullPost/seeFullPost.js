import {
  COMMENT_FRAGMENT
} from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args, {
      db
    }) => {
      const {
        id
      } = args;
      const post = await db.post({
        id
      });
      const comments = await db.post({
        id
      }).comments().$fragment(COMMENT_FRAGMENT);
      const likeCount = await db.likesConnection({
        where: {
          post: {
            id
          }
        }
      }).aggregate().count();
      return {
        post,
        comments,
        likeCount
      }
    }
  }
}