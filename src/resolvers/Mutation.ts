import { schema } from "nexus";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signUp", {
      type: "AuthPayload",
      args: {
        name: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        return {
          token: sign({ userId: user.id }, "MYSECRET", { expiresIn: "7 days" }),
          user,
        };
      },
    });
    
  },

});
