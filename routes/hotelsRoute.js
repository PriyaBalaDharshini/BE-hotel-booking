import express from "express";
import hotelController from "../controllers/hotelController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();
/* Create */
router.post("/create-hotel", verifyToken.verifyAdmin, hotelController.createHotel);

/* Update */
router.put("/:id", verifyToken.verifyAdmin, hotelController.updateHotel);

/* Delete */
router.delete("/:id", verifyToken.verifyAdmin, hotelController.deleteHotel);

/* Get all */
router.get("/all-hotels", hotelController.getAllHotels);

/* count by city */
router.get("/countByCity", hotelController.countByCity);

/* count by city */
router.get("/countByType", hotelController.countByType);

/* Get by id */
router.get("/find/:id", hotelController.getHotelById);



export default router