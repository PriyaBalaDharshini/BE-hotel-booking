import Hotel from "../models/HotelModel.js";
import Room from "../models/RoomModel.js";
//after creating room we need to add it to Room model where er created schema related to room

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).send({
            message: "New Room created",
            savedRoom
        })
    } catch (error) {
        next(error)
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body })
        res.status(200).send({
            message: "Room Details Updated  Successfully",
        })
        await updatedRoom.save();
    } catch (error) {
        next(error)
    }
}
//Delete
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).send({ message: "Room has been deleted" })
    } catch (error) {
        next(error)
    }
}

//Get all
const getAllRooms = async (req, res, next) => {
    try {
        const allRooms = await Room.find();
        res.status(200).send({
            message: "All Rooms fetched Successfully",
            allRooms
        })
    } catch (error) {
        next(error)
    }
}
//Get By Id
const getRoomById = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).send({
            message: `Room details for ${req.params.id}`,
            room
        })
    } catch (error) {
        next(error)
    }

}

export default { createRoom, updateRoom, deleteRoom, getAllRooms, getRoomById }