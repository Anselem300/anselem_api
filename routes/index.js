const router = require("express").Router();

router.use("/", (req, res) => {
    res.send("Welcome to my personal project! Developed by Anselem Obianuju Samuel")
})

module.exports = router;