const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/Scrum",
  (err, client) => {
    if (err) {
      console.log("Mongo Connection Error");
    }
    const db = client.db("Scrum");

    db.collection("ScrumBoard")
      .findOneAndUpdate(
        { _id: "5b37b8407032f227b6089ea2" },
        { $set: { text: "User Story - 01" } }
      )
      .then(result => {
        console.log(result);
      });
  }
);
