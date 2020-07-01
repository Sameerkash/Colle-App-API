import { Context } from "graphql-yoga/dist/types";

const Query = {
  async users(parent: any, args: any, ctx: Context, info: any) {
    //  const opArgs = {};

    //  if (args.query) {
    //    opArgs.where = {
    //      OR: [
    //        { name_contains: args.query },
    //        {
    //          email_contains: args.query,
    //        },
    //      ],
    //    };

    return await ctx.prisma.users();
    //  }
  },
};

export default { Query };
