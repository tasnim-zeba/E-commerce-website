const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database")
const { setIO } = require("./socket");



//Handling uncaught exceptions
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})
//Config
dotenv.config({path:"backend/config/config.env"});

connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
        credentials: true,
    },
});

setIO(io);

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {

        socket.join(userId);

        console.log(`${userId} joined room`);
        // console.log(socket.rooms);

    });

    socket.on("disconnect", () => {

        console.log("User Disconnected:", socket.id);

    });

});

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
}); 

//Unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    httpServer.close(() => {
        process.exit(1);
    });
})