export default {
  Query: {
    seeUser: async (_, args, {
      db
    }) => {
      const {
        userName
      } = args;
      return db.user({
        userName
      });
    }
  }
}