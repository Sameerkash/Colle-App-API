import * as jwt from "jsonwebtoken";

function generateToken(userId: string): string {
  return jwt.sign({ userId }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "7 days",
  });
}

export default { generateToken };
