import {
  prisma
} from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        email,
        userName,
        firstName = "",
        lastName = "",
        bio = ""
      } = args;
      const user = await prisma.createUser({
        email,
        userName,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};