import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

/* router.get("/checkauthentication", verifyToken.verifyToken, (req, res, next) => {
    res.send("Hello User You are Logged in")
})

router.get("/checkuser/:id", verifyToken.verifyUser, (req, res, next) => {
    res.send("Loggedin Successfull. Can Deleted your account too")
})

router.get("/checkadmin/:id", verifyToken.verifyAdmin, (req, res, next) => {
    res.send("Hello Admin. Can Deleted all account")
}) */

router.get("/all-users", verifyToken.verifyUser, userController.getAllUsers);
router.put("/:id", verifyToken.verifyUser, userController.updateUser);
router.delete("/:id", verifyToken.verifyUser, userController.deleteUser);
router.get("/:id", verifyToken.verifyAdmin, userController.getUserById);

export default router