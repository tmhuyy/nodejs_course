const express = require("express");
const router = express.Router();


const {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    validateTourId,
    validateEnteredTour,
    autoAddId
} = require("../controllers/tourControllers")

router.param("id", validateTourId)

router.route("/")
    .get(getAllTours)
    .post(autoAddId, validateEnteredTour, createTour)

router.route("/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router