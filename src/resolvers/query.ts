import { Context } from "graphql-yoga/dist/types";
import { Args } from "prisma-client-lib/dist/types";
import { UserWhereInput } from "../generated/prisma-client";

const Query = {
  async users(parent: any, args: Args, ctx: Context, info: any) {
   //  const opArgs: UserWhereInput = {};


    return await ctx.prisma.users( info);
  },
};

export default { Query };
