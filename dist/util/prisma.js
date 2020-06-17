"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const prisma_binding_1 = require("prisma-binding");
const prisma = new prisma_binding_1.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: "http://localhost:4466"
});
exports.default = prisma;
