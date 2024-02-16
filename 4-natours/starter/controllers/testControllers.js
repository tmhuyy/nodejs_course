exports.getTest = (req, res) =>
{
    res.status(200).json({
        status: "test"
    })
}