const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/Scrum",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to Mongo");
    }
    console.log("Connected!");
    const db = client.db("Scrum");

    db.collection("ScrumBoard").insertOne({ text: "hello" }, (err, result) => {
      if (err) {
        console.log("Unable to insert");
      } else {
        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    });
    client.close();
  }
);
