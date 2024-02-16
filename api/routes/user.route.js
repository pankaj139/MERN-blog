import express from 'express';
import {update} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.put('/update/:userId',verifyToken, update);

export default router;
