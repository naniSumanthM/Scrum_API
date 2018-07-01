let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Codecards");

var Userstory = mongoose.model("Userstory", {
  title: { type: String, required: true, minlength: 1, trim: true },
  description: { type: String },
  status: { type: String }
});

let newStory = new Userstory({
  title: "Discover endpoints",
  description: "Need to research Jenkins XML API",
  status: "Defined"
});

newStory.save().then(
  doc => {
    console.log(doc);
  },
  e => {
    console.log("Insert Failed");
  }
);
