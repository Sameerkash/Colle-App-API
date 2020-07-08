// import { ContextParameters } from "graphql-yoga/dist/types";

function getUserId(token: any | null | undefined) {
  const userId = token.userId;
  if (!userId) {
    throw new Error("Not Authorized!");
  }

  return userId;
}

export { getUserId };
