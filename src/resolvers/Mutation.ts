import { schema } from "nexus";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getUserId } from "../utils/header";
import { auth } from "nexus-plugin-jwt-auth";

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
      resolve: (_parent, { title, content, authorId, imageUrl }, ctx) => {
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
  },
});
