import { Context } from "graphql-yoga/dist/types";
import { Args } from "prisma-client-lib/dist/types";
import bcrypt from "bcrypt";
import { User, Post } from "../generated/prisma-client";

import { generateToken } from "../utils/token";
import { getUserId } from "../utils/header";

const Mutation = {
  async signUp(
    _parent: any,
    { data: { email, password, name } }: Args,
    { prisma }: Context,
    _info: any
  ): Promise<{ user: User; token: string }> {
    const userCheck: User = await prisma.user({ email });
    if (userCheck) {
      throw new Error("Email is already registered");
    }
    const hashedPassword: string = await bcrypt.hash(password, 12);
    password = hashedPassword;

    const user: User = await prisma.createUser({
      email: email,
      password: password,
      name: name,
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },

  async signin(
    _: any,
    { data: { email, password } }: Args,
    { prisma }: Context,
    info: any
  ): Promise<{ user: User; token: string }> {
    const userCheck: User = await prisma.user({ email });
    if (!userCheck) {
      throw new Error("User Not Found");
    }

    const isMatch: boolean = await bcrypt.compare(password, userCheck.password);

    if (!isMatch) {
      throw Error("Wrong Credentials");
    }

    return {
      user: userCheck,
      token: generateToken(userCheck.id),
    };
  },

  async deleteUser(
    _parent: any,
    { id }: Args,
    ctx: Context,
    _info: any
  ): Promise<User> {
    const userId: string = getUserId(ctx.request);
    var user: User;

    const userCheck = await ctx.prisma.user({
      id: id,
    });
    if (!userCheck) {
      throw new Error("User not found");
    }
    if (userId == id) {
      user = await ctx.prisma.deleteUser({
        id: id,
      });
    } else {
      throw new Error("Not Authorized to delete");
    }

    return user;
  },

  async createPost(_: any, args: Args, ctx: Context, info: any): Promise<Post> {
    const userId: string = getUserId(ctx.request);

    const post: Post = await ctx.prisma.createPost(
      {
        title: args.data.title,
        body: args.data.body,
        author: {
          connect: {
            id: userId,
          },
        },
      },
      info
    );

    return post;
  },
};

export default { Mutation };
