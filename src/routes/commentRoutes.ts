import { Router,Request,Response } from "express";
import { deleteComment, postComment } from "../controllers/commentController";

const router=Router();

router.post('/comment',postComment)

router.post("/comment/delete",deleteComment)

export default router