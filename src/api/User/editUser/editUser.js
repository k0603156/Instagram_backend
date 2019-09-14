export default {
  Mutation: {
    editUser: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        userName,
        email,
        firstName,
        lastName,
        bio,
        avatar
      } = args;
      const {
        user
      } = request;
      return db.updateUser({
        where: {
          id: user.id
        },
        data: {
          userName,
          email,
          firstName,
          lastName,
          bio,
          avatar
        }
      })
    }
  }
}