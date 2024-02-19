const mongoose = require("mongoose")
require('dotenv').config()

const URI = process.env.DB_LINK.replace("<DB_PASSWORD>", process.env.DB_PASSWORD)
mongoose.connect(URI).then(() =>
{
    console.log("DB CONNECTION IS SUCCESSFUL")
})

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    }
});

const Tour = mongoose.model("Tour", tourSchema);





const app = require("./app")

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
{
    console.log(`APP IS RUNNING AT PORT ${PORT}`);
});