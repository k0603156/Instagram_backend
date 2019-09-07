export default {
  Mutation: {
    upload: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        caption,
        files
      } = args;
      const {
        user
      } = request;
      const post = await db.createPost({
        caption,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      files.forEach(async file => {
        await db.createFile({
          url: file,
          post: {
            connect: {
              id: post.id
            }
          }
        })
      });
      return post;
    }
  }
}