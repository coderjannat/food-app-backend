import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middleswares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// after login with google user will go to this url
router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  })
);

// ----------
// this is for temporary purpose to ignore the erro
// router.get("/login", passport.authenticate("google"), (req, res, next) => {
//   res.send("logged in!!!");
// });

// this route is for after login, user info will be gotten
router.get("/me", isAuthenticated, myProfile);

router.get("/logout", logout);

router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default router;
