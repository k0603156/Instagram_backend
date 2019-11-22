import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, { db, request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        const { userName } = await db.user({
          email
        });
        await sendSecretMail(email, userName, loginSecret);
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
