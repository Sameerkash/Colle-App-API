import { schema } from "nexus";
import { Post } from "./Post";

export const User = schema.objectType({
  name: "User",
  definition(t) {
    t.int("id", { description: "ID of the user" });
    t.string("name", { description: "Name of the user" });
    t.string("email");
    t.string("password");
    t.boolean("isFaculty");
    t.string("department");
    t.list.field("posts", {
      type: Post,
      resolve(root, _, ctx) {
        return ctx.getUser(root.id).posts();
      },
    });
  },
});
