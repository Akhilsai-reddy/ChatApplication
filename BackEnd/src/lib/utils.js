import jwt from "jsonwebtoken";

export const SECRETE_KEY = "SECRETE_KEY";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, SECRETE_KEY, { expiresIn: "1d" });
  res.cookie("token", token);

  return token
};
