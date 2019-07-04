var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ENTRIES_COLLECTION = "entries";

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});



// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;

// // Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//
//   // Save database object from the callback for reuse.
//   db = database;
//   console.log("Database connection ready");
//
//   // Initialize the app.
//   server.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });

// ENTRIES API ROUTES BELOW

// // Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({"error": message});
// }

/*  "/api/entries"
 *    GET: finds all entries
 *    POST: creates a new entry
 */

//  app.get("/api/entries", function(req, res) {
//    var start;
//    if (req.query.start) {
//      start = new Date(req.query.start);
//    } else {
//      start = new Date();
//      start.setHours(0,0,0,0);
//    }
//    db.collection(ENTRIES_COLLECTION).find({
//      timestamp: {'$gte': start}
//    }).toArray(function(err, docs) {
//      if (err) {
//        handleError(res, err.message, "Failed to get entries.");
//      } else {
//        res.status(200).json(docs);
//      }
//    });
//
// // app.get("/api/entries/:start", function(req, res) {
// //   // var start = new Date();
// //   // start.setHours(0,0,0,0);
// //   var start = request.params.start
// //   db.collection(ENTRIES_COLLECTION).find({
// //     timestamp: {'$gte': start}
// //   }).toArray(function(err, docs) {
// //     if (err) {
// //       handleError(res, err.message, "Failed to get entries.");
// //     } else {
// //       res.status(200).json(docs);
// //     }
// //   });
//
//   // example of how we might do it if we used recommended TimeSeries schema
//   // db.collection(ENTRIES_COLLECTION).aggregate( [ { $unwind : "$values" } ] ).toArray(function(err, docs) {
//   //   if (err) {
//   //     handleError(res, err.message, "Failed to get entries.");
//   //   } else {
//   //     res.status(200).json(docs);
//   //   }
//   // });
//   // db.collection(ENTRIES_COLLECTION).find({}).toArray(function(err, docs) {
//   //   if (err) {
//   //     handleError(res, err.message, "Failed to get entries.");
//   //   } else {
//   //     var data = [];
//   //     docs.forEach(function(doc) {
//   //       var date = doc.timestamp_hour;
//   //       doc.values.forEach()
//   //       data.push(date);
//   //     });
//   //     res.status(200).json(data);
//   //   }
//   // });
// });

// app.post("/api/entries", function(req, res) {
//   var newEntry = req.body;
//
//   if (!newEntry.timestamp) {
//     handleError(res, "Invalid user input", "Must provide a timestamp.", 400);
//   }
//
//   if (!newEntry.status) {
//     handleError(res, "Invalid user input", "Must provide a status.", 400);
//   }
//
//   // to make sure that the timestamp is stored in MongoDB as a date, not as a string
//   newEntry.timestamp = new Date(newEntry.timestamp);
// //  var minute = date.getMinutes();
// //  var second = date.getSeconds();
//
//   // date.setMinutes(0);
//   // date.setSeconds(0);
//   // date.setMilliseconds(0);
//
// db.collection(ENTRIES_COLLECTION).insertOne(newEntry, function(err, doc) {
//   if (err) {
//     handleError(res, err.message, "Failed to create new contact.");
//   } else {
//     res.status(201).json(doc.ops[0]);
//   }
// });
//
// // the following is an attempt at optimization using a single document per hour
// //   db.collection(ENTRIES_COLLECTION).update(
// //     {
// //       timestamp_hour: date,
// //       type: "solastat_status",
// //     },
// //     {
// //       $set: {[`values.${minute}.${second}`]: newEntry.status}
// // //      $push: {values[minute][second]: newEntry.status}
// //     },
// //     {
// //       upsert: true
// //     },
// //     function(err, doc) {
// //       if (err) {
// //         handleError(res, err.message, "Failed to create new entry.");
// //       } else {
// //         // TODO: what should we return here?
// //         res.status(201).json("hi there");
// // //        res.status(201).json(doc.ops[0]);
// //       }
// //     }
// //   );
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
//   socket.on('state', state => {
//     io.emit('state', state);
//   });
// });

// this is a temporary hack to simulate an uploader pushing data
// setInterval(function() {
//   var state = {
//     timestamp: new Date(),
//     status: {
//       roof: 50,
//       tank: 51,
//       inlet: 52
//     }
//   }
//   console.log('emitting state');
//   io.emit('state', state);
// }, 1000);
