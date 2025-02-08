import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import * as dotenv from "dotenv";
import generateImageRoute from "./routes/GenerateImage.js";
import postRoute from "./routes/Post.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
=======
app.use(express.urlencoded({ extended: true, parameterLimit: 10000, limit: '50mb', }));

//http req recieve
app.use("/api/post", post);
app.use("/api/generateImage", generateImageRoute);
>>>>>>> 2ffb919d12a9e839f3911582ce02d25fe915ddb6

//error handle middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
})

//middleware
app.use("/api/post", postRoute);
app.use("/api/generateImage", generateImageRoute);

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello developers from me",
    });
});

//console.log("MongoDB URI:", process.env.MONGODB_URI);

const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected to Mongo DB"))
        .catch((err) => {
            console.error("failed to connect with mongo");
            console.error(err);
        });
}


const startServer = async () => {
    try {
        connectDB();
        app.listen(3000, () => console.log("Server started on port 8080"));
    } catch (error) {
        console.log(error);
    }
};

startServer();



