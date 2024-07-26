const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: String,
    file: String, 
    file_type: String,
    size: String,
    isPrivate: String,
    created_by: String,
    created_date: { type: Date, default: Date.now },
    modified_date: { type: Date, default: Date.now },
  });
  

module.exports = mongoose.model("files", fileSchema);
