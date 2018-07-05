let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose");
let ObjectId = require("mongodb").ObjectID;
let { Userstory } = require("./models/Userstory");

let app = express();
const port = 3000;

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

//GET - fetches all user stories
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

//GET - fetches individiaul user stories
app.get("/userstories/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Userstory.findById(id)
    .then(userstory => {
      if (!userstory) {
        res.status(404).send();
      } else {
        res.send({ userstory });
      }
    })
    .catch(e => {
      res.status(400).send();
    });
});

//DELETE - purges a single document given an _id

app.delete("/userstories/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Userstory.findByIdAndRemove(id)
    .then(userstory => {
      if (!userstory) {
        return res.status(404).send();
      }
      res.send(userstory);
    })
    .catch(e => {
      res.status(400).send();
    });
});

//UPDATE - Update documents in MongoDB

app.listen(port, () => {
  console.log(`Server live on ${port}`);
});
