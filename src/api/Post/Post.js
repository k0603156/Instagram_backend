export default {
  Post: {
    isLiked: async (parent, _, {
      db,
      request
    }) => {
      const {
        user
      } = request;
      const {
        id
      } = parent;
      return db.$exists.like({
        AND: [{
          user: {
            id: user.id
          }
        }, {
          post: {
            id
          }
        }]
      })
    },
    likeCount: (parent, _, {
      db
    }) => db.likesConnection({
      where: {
        post: {
          id: parent.id
        }
      }
    }).aggregate().count(),
    commentCount: (parent, _, {
      db
    }) => db.commentsConnection({
      where: {
        post: {
          id: parent.id
        }
      }
    }).aggregate().count(),
    files: (parent, _, {
      db
    }) => db.post({
      id: parent.id
    }).files(),
    comments: (parent, _, {
      db
    }) => db.post({
      id: parent.id
    }).comments(),
    user: (parent, _, {
      db
    }) => db.post({
      id: parent.id
    }).user(),
  }
};