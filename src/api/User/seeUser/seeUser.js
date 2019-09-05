export default {
  Query: {
    seeUser: async (_, args, {
      db
    }) => {
      const {
        id
      } = args;
      const user = await db.user({
        id
      });
      const posts = await db.user({
        id
      }).posts();
      return {
        user,
        posts
      };

    }
  }
}