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
      });
    }
  }
};