import express from 'express';
import {update,deleteUser,signout} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.put('/update/:userId',verifyToken, update);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout',signout)
export default router;
