import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    maxPepole: {
        type: Number,
        required: true
    },

    roomNumbers: [{
        number: Number,
        unavailableDates: { type: [Date] }
    }]
},
    { timestamps: true })

const Room = mongoose.model("Room", RoomSchema);
export default Room;