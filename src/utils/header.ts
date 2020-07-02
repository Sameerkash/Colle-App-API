import { ContextParameters } from "graphql-yoga/dist/types";
import * as jwt from "jsonwebtoken";
export function getUserId(
  request: ContextParameters,
  requireAuth: boolean = true
) {
  const header: string | undefined = request.request.headers.authorization;

  if (header) {
    const token: string = header.replace("Bearer ", "");
    const { userId }: any = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    return userId;
  }

  if (requireAuth) {
    throw new Error("Authentication required");
  }

  return null;
}
