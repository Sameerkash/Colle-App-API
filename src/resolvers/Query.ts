import { schema } from "nexus";
import { getUserId } from "../utils/header";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
      resolve: (_parent, _args, ctx) => {
        return ctx.db.post.findMany();
      },
    });

    t.list.field("getPost", {
      type: "Post",
      args: {
        search: schema.stringArg({ nullable: false }),
      },
      resolve: (_parent, { search }, ctx) => {
        return ctx.db.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                content: {
                  contains: search,
                },
              },
            ],
          },
        });
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
