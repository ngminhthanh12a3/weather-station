const { ClientFields } = require("../../../models");

module.exports = async (req, res, next) =>
{
    // console.log("Body is ", req.body)
    const {currentFMCToken} = req.body

    console.log("Delete token: ", currentFMCToken)
    await ClientFields.findOneAndDelete({tempToken: currentFMCToken})

    res.status(200).json({currentFMCToken})
}