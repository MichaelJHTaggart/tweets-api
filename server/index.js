let express = require('express');

let app = express();

let router = express.Router();

//using middleware to add to the string of our route
app.use('/api/', router);

// creating an array of objects
let pies = [
 { name: 'Apple' },
 { name: 'Pecan' },
 { name: 'Rhubarb' },
 { name: 'Banana' }
]

// basic route
router.get('/', function (req, res, next) {
 res.send("Hello World");
});

//basic route to show that we can send data
router.get('/pies', function (req, res, next) {
 res.status(200).send(pies)
})

//demonstrating how to send a JSON object (called an "envelope") around our data
router.get('/pies2', function (req, res, next) {
 res.status(200).json({
  "status": 200,
  "statusText": "OK",
  "message": "All pies sent",
  "data": pies
 });
})

//demonstrates setting up a controller file to call a function
let pieCtrl = require('./controller/pieCtrl3.js');
let pies3 = pieCtrl.pie3();
//! this is the same result as '/pies2' route above
//? What is the purpose of using the controller file and calling the data in this way?
router.get('/pies3', function (req, res, next) {
 res.status(200).json({
  "status": 200,
  "statusText": "OK",
  "message": "All pies sent",
  "data": pies3
 });
})

//demonstrates setting up a promise
//grabs all of the data from our json file
let pieCtrl4 = require('./controller/pieCtrl4.js');

router.get('/pies4', function (req, res, next) {
 pieCtrl4.getPie4(function (data) {
  res.status(200).json({
   "status": 200,
   "statusText": "OK",
   "message": "All pies sent",
   "data": data
  });
 }, function (err) {
  next(err);
 });
});

//demonstrates setting up a promise
//Adding & using a param in our callback to our promise
let pieCtrl5 = require('./controller/pieCtrl5.js');

router.get('/pies5/:id', function (req, res, next) {
 pieCtrl5.getPie5(req.params.id, function (data) {
  if (data) {
   res.status(200).json({
    "status": 200,
    "statusText": "OK",
    "message": "A pie sent",
    "data": data
   });
  } else {
   res.status(404).json({
    "status": 404,
    "statusText": "Not Found",
    "message": "The pie '" + req.params.id + "' was not found",
    "error": {
     "code": "NOT FOUND",
     "message": "The pie '" + req.params.id + "' was not found"
    }
   });
  }
 }, function (err) {
  next(err);
 });
});

//demonstrates setting up a promise
//Adding & using a query in our callback to our promise
let pieCtrl6 = require('./controller/pieCtrl6.js');

//Todo: Create GET/pies6?id=number&name=string
// http://localhost:3000/pies6?id=1&name=Apple
router.get('/pies6', function (req, res, next) {
 let searchObject = {
  "id": req.query.id,
  "name": req.query.name
 };

 pieCtrl6.getPie6(searchObject, function (data) {
  res.status(200).json({
   "status": 200,
   "statusText": "OK",
   "message": "A pie sent",
   "data": data
  });
 }, function (err) {
  next(err);
 });
});

app.listen(3001, () => { console.log("Server is running on port 3001") });