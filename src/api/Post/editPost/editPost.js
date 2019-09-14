const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, {
      request,
      db,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        id,
        caption,
        location,
        action
      } = args;
      const {
        user
      } = request;
      const post = await db.$exists.post({
        id,
        user: {
          id: user.id
        }
      });
      if (post) {

        if (action === EDIT) {
          return db.updatePost({
            data: {
              caption,
              location
            },
            where: {
              id
            }
          })
        } else if (action === DELETE) {
          return db.deletePost({
            id
          })
        }

      } else {
        throw Error("can't not found req post")
      }

    }
  }
}