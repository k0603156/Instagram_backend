export default {
  Mutation: {
    addComment: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request)
      const {
        text,
        postId
      } = args;
      const {
        user
      } = request;
      const comment = await db.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        },
        text
      });
      return comment;
    }
  }
};