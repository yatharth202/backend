import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //MONGOOSE give return object
        console.log(`/n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`) //pura mongo db ka url hai na jaha pe connection ho raha hai vo lele
    } catch (error) {
        console.log("MONGODB connection error ",error);
        process.exit(1); // current process ka reference hai
        // throw error will also shut the process
    }
}

export default connectDB