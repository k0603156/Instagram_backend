import {
  generateToken
} from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args, {
      db,
      request
    }) => {
      const {
        email,
        secret
      } = args;
      const user = await db.user({
        email
      });
      if (user.loginSecret === secret) {
        await db.updateUser({
          where: {
            id: user.id
          },
          data: {
            loginSecret: ""
          }
        })
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};