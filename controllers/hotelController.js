import Hotel from '../models/HotelModel.js'

//Create
const createHotel = async (req, res, next) => {
    try {
        const { name, type, city, address, distance, title, description, cheapestPrice } = req.body
        const newHotel = new Hotel({
            name, type, city, address, distance, title, description, cheapestPrice
        })

        // can be written as const newHotel = new Hotel(req.body);
        res.status(200).send({
            message: "New Hotel Created Successfully",
            newHotel
        })
        await newHotel.save();
    } catch (error) {
        next(error)
    }
}
//Update
const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body })
        res.status(200).send({
            message: "Hotel Details Updated  Successfully",
        })
        await updatedHotel.save();
    } catch (error) {
        next(error)
    }
}
//Delete
const deleteHotel = async (req, res, next) => {
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message: "Hotel Details Deleted  Successfully",
            deleteHotel
        })
    } catch (error) {
        next(error)
    }
}
//Get all
const getAllHotels = async (req, res, next) => {
    try {
        const { min, max, ...others } = req.query;
        const limit = parseInt(req.query.limit);
        console.log("min:", min);
        console.log("max:", max);
        console.log("limit:", limit);
        console.log("limit:", others);

        const allHotels = await Hotel.find({
            featured: 'true',
            cheapestPrice: { $gt: parseInt(min) || 1, $lt: parseInt(max) || 1999 },
        }).limit(limit);

        console.log("allHotels:", allHotels);

        res.status(200).send({
            message: "Data Fetched",
            allHotels
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
/* countByCity */
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            }))
        res.status(200).send({
            message: "Hotel counts fetched Successfully",
            list
        })
    } catch (error) {
        next(error)
        console.log(error);
    }
}
/* countByType */
const countByType = async (req, res, next) => {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
    const resortCount = await Hotel.countDocuments({ type: "resort" })
    const villaCount = await Hotel.countDocuments({ type: "villa" })
    const cabinCount = await Hotel.countDocuments({ type: "cabin" })
    try {
        res.status(200).send({
            message: "All counts fetched Successfully",
            count:
                [
                    { type: "hotel", count: hotelCount },
                    { type: "apartment", count: apartmentCount },
                    { type: "resort", count: resortCount },
                    { type: "villa", count: villaCount },
                    { type: "cabin", count: cabinCount }
                ]

        })
    } catch (error) {
        next(error)
        console.log(error);
    }
}
//Get By Id
const getHotelById = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).send({
            message: `Hotel details for ${req.params.id}`,
            hotel
        })
    } catch (error) {
        next(error)
    }

}

export default {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    getHotelById,
    countByCity,
    countByType

}


/* localhost:8000/hotel/countByCity?cities=hosur,coimbatore,chennai = query */
/* const cities = req.query.cities.split(","); // Splitting string of cities into an array
    try {
        const counts = {}; // Object to store city counts
        for (const city of cities) {
            // For each city, count the number of hotels
            const count = await Hotel.countDocuments({ city: city.trim() }); // Trim to remove any extra spaces
            counts[city] = count; // Store the count in the object
        }
        res.status(200).send({
            message: "Hotel counts fetched Successfully",
            counts
        }); */
