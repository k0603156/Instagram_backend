export default {
  Mutation: {
    createAccount: async (_, args, {
      db
    }) => {
      const {
        email,
        userName,
        firstName = "",
        lastName = "",
        bio = ""
      } = args;
      const user = await db.createUser({
        email,
        userName,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};