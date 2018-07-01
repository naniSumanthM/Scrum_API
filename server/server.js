let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose");
let { Userstory } = require("./models/Userstory");

let app = express();
app.use(bodyParser.json());

//POST - Create New Userstory
app.post("/userstories", (req, res) => {
  let userstory = new Userstory({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });

  userstory.save().then(
    doc => {
      res.status(200).send(doc);
      console.log(req.body);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/userstories", (req, res) => {
  Userstory.find().then(
    userstories => {
      res.status(200).send({ userstories });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
