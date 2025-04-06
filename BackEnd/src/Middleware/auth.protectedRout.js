import jwt from "jsonwebtoken";
import { User } from "../Models/user.modal.js";
import { SECRETE_KEY } from "../lib/utils.js";

export const protectedRout = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Unauthorised - token not provided");

    const decoded = jwt.verify(token, SECRETE_KEY);

    if (!decoded) return res.status(401).send("Unauthorised - invalid token");

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).send("user not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("protectedRout error");
    console.log("protectedRout error", error);
  }
};
