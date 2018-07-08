const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

let { mongoose } = require("./db/mongoose");
let ObjectId = require("mongodb").ObjectID;
let { Userstory } = require("./models/userstory");
let { User } = require("./models/user");
let { authenticate } = require("./middleware/authenticate");

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /users
// returns a header which contains the jSON web token
app.post("/users", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  let user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//verifies user according to jwt, and returns a user object
app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

//Post method - login users
app.post("/users/login", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//DELETE method - logout
app.delete("/users/me/token", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

//POST - Create New Userstory
app.post("/userstories", authenticate, (req, res) => {
  let userstory = new Userstory({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    _creator: req.user._id
  });

  userstory.save().then(
    doc => {
      res.status(200).send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

//GET - fetches all user stories
app.get("/userstories", authenticate, (req, res) => {
  Userstory.find({ _creator: req.user._id }).then(
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
app.get("/userstories/:id", authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Userstory.findOne({
    _id: id,
    _creator: req.user._id
  })
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
app.delete("/userstories/:id", authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Userstory.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
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
app.patch("/userstories/:id", authenticate, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["title", "description", "status"]);

  if (!ObjectId.isValid(id)) {
    res.status(404).send;
  }

  Userstory.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(userstory => {
      if (!userstory) {
        return res.status(404).send();
      }

      res.send({ userstory });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Server live on port ${port}`);
});
