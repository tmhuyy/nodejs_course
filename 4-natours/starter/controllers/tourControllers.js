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
    const tour = toursData.filter((tour) => tour.id === requestedId);

    if (tour.length === 0)
    {
        res.status(404).json({
            status: 'fail',
            message: 'Cannot found a tour',
        });
        return;
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

const createTour = (req, res) =>
{
    const newTour = {
        id: uuidv4(),
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

    if (findTour.length === 0)
    {
        res.status(404).json({
            status: 'fail',
            message: 'Cannot found a tour',
        });
        return;
    }

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

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour

}