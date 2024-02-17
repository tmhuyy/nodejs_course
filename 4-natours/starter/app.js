const express = require('express');
const morgan = require("morgan");

const app = express();

// -------------------------------ROUTER ----------------------------------------------------
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")
const testRouter = require("./routes/testRoutes")

// -------------------------------MIDDLEWARE ----------------------------------------------------
if (process.env.NODE_ENV === "development")
{
    app.use(morgan("dev"))
}

app.use(express.static(`${__dirname}/public`))

app.use(express.json()); // express.json(): middleware modifies incoming request data

app.use((req, res, next) =>
{
    req.createdAt = new Date().toISOString();
    next()
})

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tests", testRouter)

module.exports = app


