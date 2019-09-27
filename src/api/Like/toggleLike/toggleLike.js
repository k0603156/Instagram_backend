export default {
  Mutation: {
    toggleLike: async (_, args, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        postId
      } = args;
      const {
        user
      } = request;
      const filterOptions = {
        AND: [{
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };

      try {
        const existingLike = await db.$exists.like(filterOptions);
        if (existingLike) {
          //TODO Unlike
          await db.deleteManyLikes(filterOptions)
        } else {
          const newLike = await db.createLike({
            //create like
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
}