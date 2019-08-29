import {
  generateSecret,
  sendSecretMail
} from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, {
      db,
      request
    }) => {
      const {
        email
      } = args;
      console.log(request)
      const loginSecret = generateSecret();
      try {
        throw Error();
        await sendSecretMail(email, loginSecret);
        await db.updateUser({
          data: {
            loginSecret: loginSecret
          },
          where: {
            email: email
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};