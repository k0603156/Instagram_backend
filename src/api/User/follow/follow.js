export default {
  Mutation: {
    follow: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        id
      } = args;
      const {
        user
      } = request;
      try {
        await db.updateUser({
          where: {
            id: user.id
          },
          data: {
            followings: {
              connect: {
                id: id
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};