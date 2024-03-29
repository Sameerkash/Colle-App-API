import { schema } from "nexus";
import { User } from "./User";

export const Post = schema.objectType({
  name: "Post",
  definition(t) {
    t.string("id", { description: " ID of the post " });
    t.boolean("published");
    t.string("title");
    t.string("content");
    t.string("imageUrl");
    t.field("autor", {
      type: User,
      resolve(root, _, ctx) {
        return ctx.db.post.findOne({ where: { id: root.id } }).author();
      },
    });
  },
});
