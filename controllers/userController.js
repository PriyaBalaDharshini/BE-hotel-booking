import User from '../models/UserModel.js'

//Create
const createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        // can be written as const newUser = new User(req.body);
        res.status(200).send({
            message: "New User Created Successfully",
            newUser
        })
        await newUser.save();
    } catch (error) {
        next(error)
    }
}
//Update
const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body })
        res.status(200).send({
            message: "User Details Updated  Successfully",
        })
        await updatedUser.save();
    } catch (error) {
        next(error)
    }
}
//Delete
const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message: "User Details Deleted  Successfully",
            deleteUser
        })
    } catch (error) {
        next(error)
    }
}
//Get all
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.status(200).send({
            message: "All Users fetched Successfully",
            allUsers
        })
    } catch (error) {
        next(error)
    }
}
//Get By Id
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send({
            message: `User details for ${req.params.id}`,
            user
        })
    } catch (error) {
        next(error)
    }

}

export default { createUser, updateUser, deleteUser, getAllUsers, getUserById }