export default {
  Query: {
    me: async (_, __, {
      db,
      request,
      isAuthenticated
    }) => {
      isAuthenticated(request);
      const {
        user
      } = request;
      const userProfile = await db.user({
        id: user.id
      });
      const posts = await db.user({
        id: user.id
      }).posts();
      return {
        user: userProfile,
        posts
      }
    }
  }
}
// import {
//   USER_FRAGMENT
// } from "../../../fragments";

// export default {
//   Query: {
//     me: (_, __, {
//       db,
//       request,
//       isAuthenticated
//     }) => {
//       isAuthenticated(request);
//       const {
//         user
//       } = request;
//       return db.user({
//         id: user.id
//       }).$fragment(USER_FRAGMENT);
//     }
//   }
// }