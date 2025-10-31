import express from "express";
import validate from "../middleware/validate";
import {
  registerValidation,
  loginValidation,
  googleLoginValidation,
} from "../validation/user.validation";
import {
  register,
  getUsers,
  logIn,
  googleAuth,
  googleLogin,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.get("/users", getUsers);
router.post("/login", validate(loginValidation), logIn);
router.post("/google-log-in", validate(googleLoginValidation), googleLogin);
router.post("/google", validate(googleLoginValidation), googleAuth);

export default router;
