const mongoose = require("mongoose");

const connectDB = () => {
    // const MONGO_URL = 'mongodb://localhost:27017/s4';
    const MONGO_URL = 'mongodb+srv://admin:2i7XEzFMAZHnRl5H@cluster0.5gv7uwi.mongodb.net/myexam2023?retryWrites=true&w=majority';
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connected");
    }).catch(err => {
        console.log(err);
    })
};

module.exports = connectDB;