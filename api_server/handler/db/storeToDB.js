module.exports = async (Model, data, query) => {
  const dataCheck = await Model.findOne(query);

  // fix error
  if (data._id)
    delete data._id;

  if (dataCheck) await Model.findOneAndUpdate({ _id: dataCheck["_id"] }, data);
  else {
    const newData = query ? { ...data, ...query } : { ...data };

      // fix error
    if (newData._id)
      delete newData._id;
      
    var newModel = new Model(newData);

    newModel.save((err, Model) => {
      if (err) console.log(err);
    });
  }
};
