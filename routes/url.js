const express = require("express");
const { handleGenerateNewShortURL, handleGetShortID, handleGetAnalytics } = require("../controllers/url");


const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortID", handleGetShortID);

router.get("/analytics/:shortID",handleGetAnalytics)

module.exports = router;