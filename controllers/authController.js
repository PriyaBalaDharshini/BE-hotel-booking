import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import createError from '../utils/error.js'
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        res.status(200).send({
            message: "User has been created Successfully",
            newUser
        })
        await newUser.save()
    } catch (error) {

        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, "User not Found"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return next(createError(400, "Password incorrect"))
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT) //hasing these details and will send this token to verify identity non admin person cant update or delete the hotel infor
        const { password, isAdmin, ...otherDetails } = user._doc //returing details without password

        res.cookie("access_token", token, {
            httpOnly: true //it doesnt allow any client secret to reach this cookie
        })
            .status(200)
            .send({ ...otherDetails })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export default { register, login }