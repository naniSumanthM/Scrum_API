const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

let ObjectId = require("mongodb").ObjectID;
let { Userstory } = require("./models/userstory");
let { User } = require('./models/user')

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

//GET - fetches all user stories
app.get("/userstories", (req, res) => {
  Userstory.find().then(
    userstories => {
      res.status(200).send({
        userstories
      });
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
        res.send({
          userstory
        });
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
app.patch("/userstories/:id", (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, ["title", "description", "status"]);

  if (!ObjectId.isValid(id)) {
    res.status(404).send;
  }

  Userstory.findByIdAndUpdate(
    id, {
      $set: body
    }, {
      new: true
    }
  )
    .then(userstory => {
      if (!userstory) {
        return res.status(404).send();
      }
      res.send({
        userstory
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
// returns a header which contains the jSON web token
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


//run server on localhost
app.listen(3000, () => {
  console.log(`Server live on ${port}`);
});
