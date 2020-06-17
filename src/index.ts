import { GraphQLServer } from "graphql-yoga";
import prisma from "./util/prisma";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {},
  context: {
    prisma,
  },
});

server.start(() => {
  console.log("🚀 Server has started at 4000 ");
});
