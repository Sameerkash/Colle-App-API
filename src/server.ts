import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";

import resolvers from "./resolvers/resolver";
import { Prisma } from "./generated/prisma-client";

import "dotenv/config";

const typeDefs = importSchema("src/schemas/user.graphql");

export const db = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT || "http://localhost:4466",
  secret: process.env.PRISMA_SECRET || "",
});

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: async () => ({
    prisma: db,
  }),
});

server.start({ port: 4400 }, () => {
  console.log("App running on http://localhost:4400");
});
