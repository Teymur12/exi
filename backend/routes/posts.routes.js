import express from "express"
import { createPost, deleteComment, getAllPosts, likeUnlikePost, newComment } from "../controllers/posts.controller.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/createpost", protectRoute, createPost)
router.get("/",protectRoute,getAllPosts)
router.get("/:id",protectRoute,likeUnlikePost)
router.post("/:id",protectRoute,newComment)
router.delete("/:id/:commentId",protectRoute,deleteComment)

export default router