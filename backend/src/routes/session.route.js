import {Router} from "express";
import { getSessionDetails,getAllSessions  } from "../controllers/session.controller.js";

const router = Router();

router.get("/get-session-details",getSessionDetails);
router.get("/get-all-sessions/:email",getAllSessions);

export default router;