const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
// const passport = require("passport");

// const initializePassport = require("./passport-config");
// initializePassport(passport);

// PORT
const PORT = process.env.PORT || 3001;

// EXPRESSs
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.use(routes);

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gamesite_DB", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./"));
// });

// PORT
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});