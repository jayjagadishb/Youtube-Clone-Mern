import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//UPDATE A USER
router.put("/:id", verifyToken, update); // here verifyToken is the middleware

//DELETE USER
router.delete("/:id", verifyToken, deleteUser);

//GET USER
router.get("/find/:id", getUser);

//SUBSCRIBE USER
router.put("/sub/:id", verifyToken, subscribe);

//UNSUBSCRIBE USER
router.put("/unsub/:id", verifyToken, unsubscribe);

//LIKE A VIDEO
router.put("/like/:videoid", verifyToken, like);

//DISLIKE A VIDEO
router.put("/dislike/:videoid", verifyToken, dislike);

export default router;
