import { Router } from "express";
import { checkUser, getAllUsers, onboardUser } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/check-user", checkUser);
AuthRouter.post("/onboard-user", onboardUser);
AuthRouter.get("/get-contacts", getAllUsers);

export default AuthRouter;
