const express = require("express");
const urlRoutes = require("./routes/url");
const { connectToMongoDB } = require("./connection");

const app = express();
app.use(express.json())

const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener")
.then(()=>console.log("MongoDB connected."));

app.use("/", urlRoutes);


app.listen(PORT, ()=> console.log(`Server started at Port:${PORT}`));