import { Context } from "graphql-yoga/dist/types";
import { Args } from "prisma-client-lib/dist/types";
import bcrypt from "bcrypt";
import { UserWhereUniqueInput, User } from "../generated/prisma-client";

const Mutation = {
  async signUp(
    _parent: any,
    { data: { email, password, name } }: Args,
    { prisma }: Context,
    _info: any
  ) {
    const userCheck: User = await prisma.user({ email });
    if (userCheck) {
      throw new Error("Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    password = hashedPassword;

    const user = await prisma.createUser({
      email: email,
      password: password,
      name: name,
    });

    return user;
  },

  async deleteUser(_parent: any, { id }: Args, ctx: Context, _info: any) {
    const userCheck = await ctx.prisma.user({
      id: id,
    });
    if (!userCheck) {
      throw new Error("User not found");
    }
    const user = await ctx.prisma.deleteUser({
      id: id,
    });

    return user;
  },
};

export default { Mutation };
