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
    // }, //custom resolver it working on another query
    // User: {
    //   fullName: (parent) => {
    //     // console.log("Parent:", parent); => Query.user
    //     return `${parent.firstName} ${parent.lastName}`;
    //   }
  }
  // User: {
  //   fullName: (parent, __, {
  //     request
  //   }) => {
  //     // console.log("Parent:", parent); => Query.user
  //     return 'ssss';
  //   }
  // }
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