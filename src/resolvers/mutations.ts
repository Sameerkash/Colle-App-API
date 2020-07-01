import { Context } from "graphql-yoga/dist/types";
import { Args } from "prisma-client-lib/dist/types";
import bcrypt from "bcrypt";

const Mutation = {
  async signUp(parent: any, args: Args, ctx: Context, info: any) {
    const userCheck = await ctx.prisma.user({
      email: args.data.email,
    });
    if (userCheck) {
      throw new Error("Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(args.data.password, 12);
    args.data.password = hashedPassword;

    console.log(args.data);
    const user = await ctx.prisma.createUser({
      ...args.data,
    });

    return user;
  },
};

export default { Mutation };
