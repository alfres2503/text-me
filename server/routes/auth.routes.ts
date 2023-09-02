import { Router } from "express";
import { checkUser, onboardUser } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/check-user", checkUser);
AuthRouter.post("/onboard-user", onboardUser);

export default AuthRouter;
