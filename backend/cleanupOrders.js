require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const mongoose = require("mongoose");

const cleanupOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const result = await mongoose.connection
            .collection("Order")
            .updateMany({}, { $unset: { restaurantId: "" } });

        console.log(`Removed restaurantId from ${result.modifiedCount} order(s)`);
    } catch (error) {
        console.error("Order cleanup failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

cleanupOrders();