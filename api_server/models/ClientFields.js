const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientFieldsSchema = new Schema({
    tempToken: { type: String, required: true, unique: true }
});

const ClientFields = mongoose.model("ClientFields", ClientFieldsSchema);
module.exports = ClientFields