import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../Controllers/auth.controller.js";
import { protectedRout } from "../Middleware/auth.protectedRout.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectedRout, updateProfile);

router.get("/check", protectedRout, checkAuth);

export default router;
