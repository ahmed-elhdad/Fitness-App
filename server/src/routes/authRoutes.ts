import express from "express";
import validate from "../middleware/validate";
import {
  registerValidation,
  loginValidation,
  googleLoginValidation,
} from "../validation/user.validation";
import {
  register,
  logIn,
  googleAuth,
  googleLogin,
  appleAuth,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/register", validate(registerValidation), register);

router.post("/login", validate(loginValidation), logIn);
router.post("/google-log-in", validate(googleLoginValidation), googleLogin);
router.post("/google", validate(googleLoginValidation), googleAuth);

export default router;
