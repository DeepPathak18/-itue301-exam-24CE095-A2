require("dotenv").config();

const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

const restaurants = [
    {
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.5,
        isOpen: true
    },
    {
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.2,
        isOpen: true
    },
    {
        name: "Dragon House",
        cuisine: "Chinese",
        rating: 4.0,
        isOpen: false
    },
    {
        name: "Burger Hub",
        cuisine: "Fast Food",
        rating: 4.3,
        isOpen: true
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Restaurant.deleteMany();

        await Restaurant.insertMany(restaurants);

        console.log("Restaurant data inserted successfully");

        await mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDatabase();