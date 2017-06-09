var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ENTRIES_COLLECTION = "entries";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// ENTRIES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/entries"
 *    GET: finds all entries
 *    POST: creates a new entry
 */

app.get("/api/entries", function(req, res) {
  db.collection(ENTRIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get entries.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/entries", function(req, res) {
  var newEntry = req.body;

  if (!newEntry.timestamp) {
    handleError(res, "Invalid user input", "Must provide a timestamp.", 400);
  }

  var date = new Date(newEntry.timestamp);
  var minute = date.getMinutes();
  var second = date.getSeconds();

  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  db.collection(ENTRIES_COLLECTION).update(
    {
      timestamp_hour: date,
      type: "solastat_status"
    },
    {
      $set: {"values.59": 20000}
    },
    {
      upsert: true
    }
  );
});
