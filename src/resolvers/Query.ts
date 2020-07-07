import { schema } from "nexus";

export const Query = schema.queryType({
  definition(t) {
    t.list.field("allusers", {
      type: "User",
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});
