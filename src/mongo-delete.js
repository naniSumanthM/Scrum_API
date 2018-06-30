const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/Scrum",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to Mongo");
    }
    console.log("Connected!");
    const db = client.db("Scrum");

    db.collection("ScrumBoard")
      .deleteOne({ text: "testing" })
      .then(result => {
        console.log(result);
      });
    client.close();
  }
);
