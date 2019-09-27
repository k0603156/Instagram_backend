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
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret);
        await db.updateUser({
          data: {
            loginSecret: loginSecret
          },
          where: {
            email: email
          }
        });
        // 예외가 발생해도 이메일은 이미 보내짐 수정필요
        return true;
      } catch {
        return false;
      }
    }
  }
};