import { Context } from "graphql-yoga/dist/types";
import { getServers } from "dns";

const Mutation = {
  async createUser(parent: any, args: any, ctx: Context, info: any) {
    console.log(args);
    const user = await ctx.prisma.createUser({
      ...args.data,
    });
    console.log(user);
    return user;
  },
};

export default { Mutation };
