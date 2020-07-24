import { schema } from "nexus";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getUserId } from "../utils/header";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signUp", {
      type: "AuthPayload",

      args: {
        name: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
        department: schema.stringArg({ nullable: false }),
        isFaculty: schema.booleanArg(),
      },
      resolve: async (
        _parent,
        { name, email, password, department, isFaculty },
        ctx
      ) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            department,
            isFaculty,
          },
        });
        return {
          token: sign({ userId: user.id }, "MYSECRET", { expiresIn: "7 days" }),
          user,
        };
      },
    });

    t.field("createDraft", {
      type: "Post",
      args: {
        title: schema.stringArg({ nullable: false }),
        content: schema.stringArg({ nullable: false }),
        imageUrl: schema.stringArg(),
        authorId: schema.stringArg({ nullable: false }),
      },
      resolve: (_parent, { title, content, imageUrl }, ctx) => {
        const userId = getUserId(ctx.token);
        if (!userId) {
          throw new Error("Invalid userId");
        }
        return ctx.db.post.create({
          data: {
            title,
            content,
            createdAt: Date.now().toString(),
            author: {
              connect: {
                id: Number(userId),
              },
            },
          },
        });
      },
    });

    t.field("publishDraft", {
      type: "Post",
      args: {
        postId: schema.intArg({ nullable: false }),
      },
      resolve: async (_parent, args, ctx) => {
        const userId = getUserId(ctx.token);
        if (!userId) {
          throw new Error("Invalid userId");
        }
        const post = await ctx.db.post.findOne({
          where: { id: args.postId },
        });
        if (post?.authorId != userId) {
          throw new Error("Not authorized");
        }
        return ctx.db.post.update({
          where: {
            id: args.postId,
          },
          data: {
            published: true,
          },
        });
      },
    });

    t.field("editPost", {
      type: "Post",
      args: {
        postId: schema.intArg({ nullable: false }),
        title: schema.stringArg({ nullable: false }),
        content: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, args, ctx) => {
        const userId = getUserId(ctx.token);
        if (!userId) {
          throw new Error("Invalid userId");
        }
        const post = await ctx.db.post.findOne({
          where: { id: args.postId },
        });
        if (post?.authorId != userId) {
          throw new Error("Not authorized");
        }
        return ctx.db.post.update({
          where: {
            id: args.postId,
          },
          data: {
            title: args.title,
            content: args.content,
          },
        });
      },
    });

    t.field("deletePost", {
      type: "Post",
      args: {
        postId: schema.intArg({ nullable: false }),
      },
      resolve: async (_parent, args, ctx) => {
        const userId = getUserId(ctx.token);
        if (!userId) {
          throw new Error("Invalid userId");
        }
        const post = await ctx.db.post.findOne({
          where: { id: args.postId },
        });
        if (post?.authorId != userId) {
          throw new Error("Not authorized");
        }
        return ctx.db.post.delete({
          where: {
            id: args.postId,
          },
        });
      },
    });
  },
});
