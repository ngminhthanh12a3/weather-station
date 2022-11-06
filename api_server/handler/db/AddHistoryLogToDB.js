const TryCactchFunc = async (Model, JSONData={}) => {
    try {
        const LOG_ID = await Model.count();
    
        const NEW_MODEL = new Model({LOG_ID,...JSONData});
        NEW_MODEL.save((err, Model) => {
          if (err) console.log(err);
        })

    } catch (error) {
        console.log(error);
        TryCactchFunc(Model, JSONData={});
    }
    
};

module.exports = TryCactchFunc;