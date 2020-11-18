const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// PORT
const PORT = process.env.PORT || 3000;

// EXPRESS
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MONGOOSE CONNECTION
// Secondary Data
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

if (process.env.NODE_ENV === "gaming production") {
    app.use(express.static(""));
} else {
    app.use(express.static("public"));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./"));
});

// PORT
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});