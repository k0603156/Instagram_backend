export default {
  User: {
    posts: ({
      id
    }, _, {
      db
    }) => db.user({
      id
    }).posts(),

    followings: ({
      id
    }, _, {
      db
    }) => db.user({
      id
    }).followings(),

    followers: ({
      id
    }, _, {
      db
    }) => db.user({
      id
    }).followers(),

    likes: ({
      id
    }, _, {
      db
    }) => db.user({
      id
    }).likes(),

    comments: ({
      id
    }, _, {
      db
    }) => db.user({
      id
    }).comments(),

    chatRooms: ({
      id
    }, _, {
      db
    }) => db.user({
      id
    }).chatRooms(),

    postsCount: ({
        id
      }) =>
      prisma
      .postsConnection({
        where: {
          user: {
            id
          }
        }
      })
      .aggregate()
      .count(),

    followingsCount: ({
        id
      }) =>
      prisma
      .usersConnection({
        where: {
          followers_some: {
            id
          }
        }
      })
      .aggregate()
      .count(),

    followersCount: ({
        id
      }) =>
      prisma
      .usersConnection({
        where: {
          following_none: {
            id
          }
        }
      })
      .aggregate()
      .count(),

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