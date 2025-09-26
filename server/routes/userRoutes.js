import express from "express";
import validate from "../middleware/validate.js";
import {
  registerValidation,
  loginValidation,
  googleLoginValidation,
} from "../validation/user.validation.js";
import {
  register,
  logIn,
  googleAuth,
  googleLogin,
  appleAuth,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), logIn);
router.post("/google-log-in", validate(googleLoginValidation), googleLogin);
router.post("/google", validate(googleLoginValidation), googleAuth);

export default router;
