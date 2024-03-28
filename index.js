import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/authRoute.js'
import hotelRoutes from './routes/hotelsRoute.js'
import roomsRoutes from './routes/roomsRoute.js'
import usersRoutes from './routes/usersRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT;

app.use("/", (req, res) => {
    res.status(200).send({ message: "Welcome to Hotel Booking Backend" })
})
app.use("/auth", authRoutes)
app.use("/hotel", hotelRoutes)
app.use("/room", roomsRoutes)
app.use("/user", usersRoutes)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong";
    return res.status(errorStatus).send({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack: err.stack
    })
})


mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.log(error))

app.listen(PORT, () => console.log(`App is listening to port ${PORT}`))

