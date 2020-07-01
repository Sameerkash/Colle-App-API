"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var prisma_client_1 = require("./generated/prisma-client");
require("dotenv/config");
var query_1 = __importDefault(require("./resolvers/query"));
var mutations_1 = __importDefault(require("./resolvers/mutations"));
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schemas/user.graphql",
    resolvers: [query_1.default, mutations_1.default],
    context: { prisma: prisma_client_1.prisma },
});
server.start(function () { return console.log("Server is running on http://localhost:4000"); });
//# sourceMappingURL=server.js.map