export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, {
      db,
      request
    }) => {
      const {
        user
      } = request;
      const {
        id: parentId
      } = parent;
      try {
        return db.$exists.user({
          AND: [{
            id: user.id
          }, {
            followings_some: {
              id: parentId
            }
          }]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, {
      db,
      request
    }) => {
      const {
        user
      } = request;
      const {
        id: parentId
      } = parent;
      return user.id === parentId;
    }
  }
};