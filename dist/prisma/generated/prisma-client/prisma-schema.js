"use strict";
// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = "type AggregateUser {\n  count: Int!\n}\n\ntype BatchPayload {\n  count: Long!\n}\n\nscalar Long\n\ntype Mutation {\n  createUser(data: UserCreateInput!): User!\n  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User\n  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!\n  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!\n  deleteUser(where: UserWhereUniqueInput!): User\n  deleteManyUsers(where: UserWhereInput): BatchPayload!\n}\n\nenum MutationType {\n  CREATED\n  UPDATED\n  DELETED\n}\n\ninterface Node {\n  id: ID!\n}\n\ntype PageInfo {\n  hasNextPage: Boolean!\n  hasPreviousPage: Boolean!\n  startCursor: String\n  endCursor: String\n}\n\ntype Query {\n  user(where: UserWhereUniqueInput!): User\n  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!\n  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!\n  node(id: ID!): Node\n}\n\ntype Subscription {\n  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload\n}\n\ntype User {\n  id: ID!\n  password: String!\n  email: String!\n  name: String!\n}\n\ntype UserConnection {\n  pageInfo: PageInfo!\n  edges: [UserEdge]!\n  aggregate: AggregateUser!\n}\n\ninput UserCreateInput {\n  id: ID\n  password: String!\n  email: String!\n  name: String!\n}\n\ntype UserEdge {\n  node: User!\n  cursor: String!\n}\n\nenum UserOrderByInput {\n  id_ASC\n  id_DESC\n  password_ASC\n  password_DESC\n  email_ASC\n  email_DESC\n  name_ASC\n  name_DESC\n}\n\ntype UserPreviousValues {\n  id: ID!\n  password: String!\n  email: String!\n  name: String!\n}\n\ntype UserSubscriptionPayload {\n  mutation: MutationType!\n  node: User\n  updatedFields: [String!]\n  previousValues: UserPreviousValues\n}\n\ninput UserSubscriptionWhereInput {\n  mutation_in: [MutationType!]\n  updatedFields_contains: String\n  updatedFields_contains_every: [String!]\n  updatedFields_contains_some: [String!]\n  node: UserWhereInput\n  AND: [UserSubscriptionWhereInput!]\n}\n\ninput UserUpdateInput {\n  password: String\n  email: String\n  name: String\n}\n\ninput UserUpdateManyMutationInput {\n  password: String\n  email: String\n  name: String\n}\n\ninput UserWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  password: String\n  password_not: String\n  password_in: [String!]\n  password_not_in: [String!]\n  password_lt: String\n  password_lte: String\n  password_gt: String\n  password_gte: String\n  password_contains: String\n  password_not_contains: String\n  password_starts_with: String\n  password_not_starts_with: String\n  password_ends_with: String\n  password_not_ends_with: String\n  email: String\n  email_not: String\n  email_in: [String!]\n  email_not_in: [String!]\n  email_lt: String\n  email_lte: String\n  email_gt: String\n  email_gte: String\n  email_contains: String\n  email_not_contains: String\n  email_starts_with: String\n  email_not_starts_with: String\n  email_ends_with: String\n  email_not_ends_with: String\n  name: String\n  name_not: String\n  name_in: [String!]\n  name_not_in: [String!]\n  name_lt: String\n  name_lte: String\n  name_gt: String\n  name_gte: String\n  name_contains: String\n  name_not_contains: String\n  name_starts_with: String\n  name_not_starts_with: String\n  name_ends_with: String\n  name_not_ends_with: String\n  AND: [UserWhereInput!]\n}\n\ninput UserWhereUniqueInput {\n  id: ID\n  email: String\n}\n";
//# sourceMappingURL=prisma-schema.js.map