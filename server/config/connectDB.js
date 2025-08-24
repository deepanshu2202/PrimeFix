import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("MongoDB connected!");
            })
    } catch (err) {
        console.error('MongoDB connection error:\n', err);
    }
}

export default connectDB