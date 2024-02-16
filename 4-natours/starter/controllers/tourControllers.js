const fs = require('fs');
const { v4: uuidv4 } = require('uuid')

const toursData = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) =>
{
    res.status(200).json({
        status: 'success',
        results: toursData.length,
        data: {
            tours: toursData,
        },
    });
};

const getTour = (req, res) =>
{
    const { id: requestedId } = req.params;

    console.log(requestedId);
    const [tour] = toursData.filter((tour) => tour.id === requestedId);

    res.status(200).json({
        status: 'success',
        data: {
            ...tour,
        },
    });
};

const createTour = (req, res) =>
{
    const newTour = {
        id: req.newID,
        createdAt: req.createdAt,
        ...req.body,
    };

    toursData.push(newTour);
    console.log('DEBUG /api/v1/tours request', newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(toursData),
        (err) =>
        {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
}

const updateTour = (req, res) =>
{
    const { id } = req.params;
    const enteredTour = req.body;

    const [findTour] = toursData.filter((tour) => tour.id === id);

    const updatedTour = {
        ...findTour, // keep id
        ...enteredTour,
    };

    const newTours = toursData.map((tour) =>
    {
        if (tour.id === id)
        {
            return {
                ...updatedTour,
            };
        }

        return tour;
    });
    console.log(`DEBUG tour is update: id ${id}`, updatedTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(newTours),
        (err) =>
        {
            res.status(200).json({
                status: 'success',
                data: {
                    tour: updatedTour,
                },
            });
        }
    );
}

const deleteTour = (req, res) =>
{
    const { id } = req.params;
    const [deletedTour] = toursData.filter((tour) => tour.id === id);
    console.log('DEBUG deletedTour', deletedTour);

    const remainTours = toursData.filter((tour) => tour.id !== id);

    console.log('DEBUG remainTours', remainTours);
}

const validateTourId = (req, res, next, val) =>
{
    const findedTour = toursData.filter((tour) => tour.id === val);
    console.log(val)

    if (findedTour.length === 0)
    {
        return res.status(404).json({
            status: 'fail',
            message: 'Cannot found a tour',
        });
    }
    next()
}

const validateEnteredTour = (req, res, next) =>
{
    const data = req.body;
    if (toursData.some(tour => tour.name === data.name))
    {
        return res.status(400).json({
            status: "fail",
            message: "A tour name is already existed"
        })
    }
    next()
}

const autoAddId = (req, res, next) =>
{
    req.newID = uuidv4()
    next()
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    validateTourId,
    validateEnteredTour,
    autoAddId
}