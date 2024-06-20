const shortid = require("shortid")

const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    console.log("--->", body)
    if(!body.url){
        return res.status(400).json({error:"URL is required."});
    }

    const shortID = shortid();

    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({ id: shortID });
}


async function handleGetShortID(req, res){
    console.log()
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {shortID: shortID}, //Find
        { $push:{visitHistory: { timestamp: Date.now() }}} //Update
    )

    res.redirect(entry.redirectURL)

}

async function handleGetAnalytics(req, res){
    const shortID = req.params.shortID;

    const result = await URL.findOne({shortID});

    return res.json({totalClicks: result.visitHistory.length , analytics: result.visitHistory});
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetShortID,
    handleGetAnalytics
}