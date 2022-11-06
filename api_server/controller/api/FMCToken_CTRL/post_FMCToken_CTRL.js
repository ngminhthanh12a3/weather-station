const { storeToDB } = require("../../../handler")
const { ClientFields } = require("../../../models")

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
module.exports = async (req, res, next) =>
{
    // console.log("Body is ", req.body)
    const {currentFMCToken=""} = req.body

    if (await ClientFields.findOne({tempToken: currentFMCToken}))
    {

    }
    else
    {
      const newClientField = new ClientFields({tempToken: currentFMCToken})
  
      await newClientField.save((err, Model) => {
        if (err) console.log(err);
      });
      
    }
    res.status(200).json({currentFMCToken})
}