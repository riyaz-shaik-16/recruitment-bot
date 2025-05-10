import { Router } from "express";
import {
    googleAuth,
    logout
} from "../controllers/auth.controller.js"

const router = Router();

router.get("/google",googleAuth)
router.post("/logout",logout);

export default router;