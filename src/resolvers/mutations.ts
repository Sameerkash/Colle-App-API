import { Context } from "graphql-yoga/dist/types";

const Mutation = {
  async createUser(
    parent: any,
    args: { name: String; email: String; password: String },
    ctx: Context,
    info: any
  ) {
    return await ctx.prisma.createUser({
      name: args.name,
      email: args.email,
      password: args.password,
    });
  },
};

export default { Mutation };
