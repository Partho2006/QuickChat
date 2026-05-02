import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // console.log("MONGO URI USED =>", process.env.MONGODB_URI);
        mongoose.connection.on('connected', ()=> console.log('Database Connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
        

    } catch ( error ) {
        console.log(error);
    }
}