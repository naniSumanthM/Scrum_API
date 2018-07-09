let mongoose = require("mongoose");

let Userstory = mongoose.model("Userstory", {
  title: { type: String, required: true, minlength: 1, trim: true },
  description: { type: String, default: null },
  status: { type: String, default: null },
  _creator: { required: true, type: mongoose.Schema.Types.ObjectId }
});

module.exports = { Userstory };
