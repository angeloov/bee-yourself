const mongoose = require('mongoose');

let BzzSchema = mongoose.Schema({
  beeName: {
    type: String,
    required: true,
  },
  bzzBody: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const BzzModel = mongoose.model("Post", BzzSchema);
module.exports = BzzModel;