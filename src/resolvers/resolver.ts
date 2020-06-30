import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Query: {
    me: async (parent, { id }, { prisma }) => {
      const user = await prisma.user({ id });
      return user;
    },
  },
};
