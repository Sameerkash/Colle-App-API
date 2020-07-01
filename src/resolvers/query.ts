import { Context } from "graphql-yoga/dist/types";
import { Args } from "prisma-client-lib/dist/types";
import { UserWhereInput } from "../generated/prisma-client";
import { arch } from "os";

const Query = {
  async users(parent: any, args: Args, ctx: Context, info: any) {
    var opArgs: UserWhereInput = {};

    if (args.query) {
      opArgs = {
        email_contains: args.querry,
      };
    }

    return await ctx.prisma.users({
      where: {
        name_contains: args.query,
      },
    });
  },


  
};

export default { Query };
