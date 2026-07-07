
const express = require("express");
const qs = require('qs');
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.set('query parser', (str) => qs.parse(str));
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(express.urlencoded({ extended: true }));

// app.use((req,res,next)=>{
//     console.log("BODY:", req.body);
//     next();
// });


//Rouite Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const conversation = require("./routes/conversationRoute");
const message = require("./routes/messageRoute");
const notification = require("./routes/notificationRoute");




app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", conversation);
app.use("/api/v1", message);
app.use("/api/v1", notification);

//Middleware for Errors
app.use(errorMiddleware)

module.exports = app