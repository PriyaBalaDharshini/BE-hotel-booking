import express from "express";
import roomController from "../controllers/roomController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();
/* Create */
router.post("/create-room/:hotelId", verifyToken.verifyAdmin, roomController.createRoom);
/* Update */
router.put("/:id", verifyToken.verifyAdmin, roomController.updateRoom);
/* Delete */
router.delete("/:id/:hotelid", verifyToken.verifyAdmin, roomController.deleteRoom);
/* Get by id */
router.get("/:id", roomController.getRoomById);
/* Get all */
router.get("/all-rooms", roomController.getAllRooms);

export default router