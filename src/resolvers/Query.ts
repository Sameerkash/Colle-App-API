import { schema } from "nexus";

export const Query = schema.queryType({
  definition(t) {
    t.list.field("allusers", {
      type: "User",
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });

    t.list.field("allPosts", {
      type: "Post",
      resolve: (_parent, _args, ctx) => {
        return ctx.db.post.findMany();
      },
    });

    t.list.field("getPost", {
      type: "Post",
      args: {
        search: schema.stringArg({ nullable: false }),
      },
      resolve: (parent, args, ctx) => {
        return ctx.db.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: args.search,
                },
              },
              {
                content: {
                  contains: args.search,
                },
              },
            ],
          },
        });
      },
    });
  },
});
