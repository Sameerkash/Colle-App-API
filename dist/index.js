"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const prisma_1 = __importDefault(require("./util/prisma"));
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {},
    context: {
        prisma: prisma_1.default,
    },
});
server.start(() => {
    console.log("🚀 Server has started at 4000 ");
});
