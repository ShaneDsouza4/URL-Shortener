const express = require("express");
const urlRoutes = require("./routes/url");
const { connectToMongoDB } = require("./connection");
const PORT = 8000;
const URL = require("./models/url");
const path = require("path");

const staticRoute = require("./routes/staticRouter")


const app = express();
app.use(express.json()); //JSON Data
app.use(express.urlencoded({extended: false})); //Form Data

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener")
.then(()=>console.log("MongoDB connected."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use("/", staticRoute);

app.use("/url", urlRoutes);



app.listen(PORT, ()=> console.log(`Server started at Port:${PORT}`));