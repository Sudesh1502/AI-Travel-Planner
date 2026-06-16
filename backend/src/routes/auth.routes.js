import express from "express";
import { login, logout, register, getUser } from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);
authRouter.get("/get-me", getUser);

export default authRouter;
