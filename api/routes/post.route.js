import  express from 'express';
import {createPost,getPost,deletePost} from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken,createPost);
router.get('/getposts',getPost);
router.delete('/delete/:postId/:userId',verifyToken,deletePost);

export default router;
