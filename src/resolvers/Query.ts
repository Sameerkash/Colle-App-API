import { schema } from "nexus";
import { getUserId } from "../utils/header";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

let myPostsCursor: number;
let mySearchCursor: number;

export const Query = schema.extendType({
  type: "Query",
  definition(t) {
    t.list.field("allusers", {
      type: "User",
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });

    t.list.field("allPosts", {
      type: "Post",
      args: {
        nextPage: schema.booleanArg({ default: false }),
        take: schema.intArg({ nullable: false }),
      },
      resolve: async (_parent, args, ctx) => {
        if (!args.nextPage) {
          const firstQueryResults = await ctx.db.post.findMany({
            take: args.take,
            orderBy: {
              createdAt: "desc",
            },
          });
          const lastPostInResults = firstQueryResults[args.take - 1]; // Remember: zero-based index! :)

          myPostsCursor = lastPostInResults.id;

          return firstQueryResults;
        } else {
          const secondQuery = await ctx.db.post.findMany({
            take: args.take,
            skip: 1,
            cursor: {
              id: myPostsCursor,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          const lastPostInResults = secondQuery[args.take - 1]; // Remember: zero-based index! :)
          if (lastPostInResults === undefined) {
            return secondQuery;
          }
          myPostsCursor = lastPostInResults.id;

          return secondQuery;
        }
      },
    });

    t.list.field("getPost", {
      type: "Post",
      args: {
        search: schema.stringArg({ nullable: false }),
        nextPage: schema.booleanArg({ default: false }),
        take: schema.intArg({ nullable: false, default: 30 }),
      },
      resolve: async (_parent, args, ctx) => {
        const where = {
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
        };

        if (!args.nextPage) {
          const firstQueryResults = await ctx.db.post.findMany({
            take: args.take,
            orderBy: {
              createdAt: "desc",
            },
          });
          const lastPostInResults = firstQueryResults[args.take - 1]; // Remember: zero-based index! :)
          if (lastPostInResults === undefined) {
            return firstQueryResults;
          }
          mySearchCursor = lastPostInResults.id;

          return firstQueryResults;
        } else {
          const secondQuery = await ctx.db.post.findMany({
            where: where,
            take: args.take,
            skip: 1,
            cursor: {
              id: mySearchCursor,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          const lastPostInResults = secondQuery[args.take - 1]; // Remember: zero-based index! :)
          if (lastPostInResults === undefined) {
            return secondQuery;
          }
          mySearchCursor = lastPostInResults.id;

          return secondQuery;
        }
      },
    });

    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (_parent, _args, ctx) => {
        const userId = getUserId(ctx.token);
        if (!userId) {
          throw new Error("Invalid userId");
        }
        return ctx.db.user.findOne({
          where: {
            id: parseInt(userId),
          },
        });
      },
    });

    t.field("login", {
      type: "AuthPayload",
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.db.user.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error("Invalid Credentials");
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid Credentials");
        }
        return {
          token: sign({ userId: user.id }, "MYSECRET"),
          user,
        };
      },
    });
  },
});
