import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(`Error In mongoDB ${error}`);
    }
};

export default connectDB;