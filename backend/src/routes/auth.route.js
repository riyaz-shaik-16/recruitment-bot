import { Router } from "express";
import {
    googleAuth,
    logout,
    deleteAccount,
    checkUserAuthenticated
} from "../controllers/auth.controller.js"
import checkUser from "../middlewares/auth.middleware.js";
import checkUserAuthenticatedMiddleware from "../middlewares/checkUserAuthenticated.middleware.js";

const router = Router();

router.get("/google",googleAuth)
router.post("/logout",logout);
router.delete("/delete-account/:email",checkUser,deleteAccount);
router.post("/check-authentication",checkUserAuthenticatedMiddleware,checkUserAuthenticated)

export default router;