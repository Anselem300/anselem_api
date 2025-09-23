const dotenv = require("dotenv").config();
const express = require("express");
const itemsRouter = require("./routes/items");
const categoriesRouter = require("./routes/categories");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const setupSwagger = require("./swagger");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const indexRoute = require("./routes/index");
const GitHubStrategy = require("passport-github2").Strategy;

setupSwagger(app);

// ✅ Middleware
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

app.use(bodyParser.json());
app.use(session({
    secret: "anselem12",
    resave: false,
    saveUninitialized: false, // ✅ better security
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Custom headers (no typo in Access-Control-Allow-Origin)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
});

// ✅ Passport GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// ✅ Routes
app.get("/", (req, res) => {
    res.send(req.session.user 
        ? `Logged in as ${req.session.user.displayName}` 
        : "Logged Out");
});

// ✅ REMOVE session: false to persist user login!
app.get("/github/callback",
    passport.authenticate("github", { failureRedirect: "/api-docs" }),
    (req, res) => {
        req.session.user = req.user; // ✅ Save user in session
        res.redirect("/");
    }
);

app.use("/", indexRoute);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("✅ MongoDB connected successfully.");
    app.listen(process.env.PORT, () => {
        console.log(`🚀 App is listening on localhost:${process.env.PORT}`);
    });
})
.catch(err => console.error("❌ MongoDB connection failed.", err));
