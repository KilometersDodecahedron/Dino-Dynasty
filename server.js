const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");

// PORT
const PORT = process.env.PORT || 3000;

// EXPRESS
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(routes);

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gamesite_DB", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./"));
});

// PORT
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});