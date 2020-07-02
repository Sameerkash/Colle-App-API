import { GraphQLServer } from "graphql-yoga";

import { prisma } from "./generated/prisma-client";

import "dotenv/config";

import Query from "./resolvers/query";
import Mutation from "./resolvers/mutations";

const server = new GraphQLServer({
  typeDefs: "./src/schemas/user.graphql",
  resolvers: [Query, Mutation],
  context: { prisma } as any,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
