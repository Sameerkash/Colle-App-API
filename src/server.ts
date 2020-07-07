import { use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { auth } from "nexus-plugin-jwt-auth";
import { protectedPaths } from "./utils/permissions";

// enables prisma
use(prisma());

use(
  auth({
    appSecret: "MYSECRET",
    protectedPaths,
  })
);
