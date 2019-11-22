export default {
  Query: {
    seeFeed: async (_, __, { request, db, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await db
        .user({
          id: user.id
        })
        .followings();
      return db.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
