const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/Scrum",
  (err, client) => {
    if (err) {
      console.log("Mongo connection error");
    }
    const db = client.db("Scrum");
    db.collection("ScrumBoard")
      .find({})
      .toArray((err, result) => {
        if (err) {
          throw console.error("Fetching data failed");
        } else {
          console.log(result);
        }
      });
  }
);
