import express from "express";
import Router from "express";
import getUesrs from "../controllers/friendsController";

const router = Router();
router.get("/getUsers", getUesrs);
export default router;