import { Router } from "express";
import { checkUser } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/check-user", checkUser);

export default AuthRouter;
