export default {
  Mutation: {
    createAccount: async (_, args, {
      db
    }) => {
      const {
        email,
        userName,
        firstName,
        lastName
      } = args;
      const exists = await db.$exists.user({
        OR: [{
          username
        }, {
          email
        }]
      });
      if (exists) {
        throw Error("This userName is already taken");
      }
      await db.createUser({
        email,
        userName,
        firstName,
        lastName
      });
      return true;
    }
  }
};