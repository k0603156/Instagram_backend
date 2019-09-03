export default {
  Query: {
    seeUser: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      const {
        id
      } = args;
      return db.user({
        id
      });

    }
  }
}