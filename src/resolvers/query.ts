import { Context } from "graphql-yoga/dist/types";
import { Args } from "prisma-client-lib/dist/types";
import { UserWhereInput, User } from "../generated/prisma-client";

const Query = {
  async users(_: any, args: Args, ctx: Context, info: any): Promise<User> {
    var where: UserWhereInput = {};

    if (args.query) {
      where = {
        name_contains: args.query,
      };
    }

    return await ctx.prisma.users(
      {
        where,
      },
      info
    );
  },
};

export default { Query };
