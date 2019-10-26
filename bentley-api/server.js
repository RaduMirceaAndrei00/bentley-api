var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var jwt = require('jsonwebtoken');
var cors = require('cors');

app.use(cors({origin: [/localhost/i]}));

var url = 'mongodb://localhost:27017/db';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8085;

mongo.MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
    .then(function (mongo) {
      return mongo.db('mydb');
    })
    .then(function (db) {
      carCollection = db.collection('car');
      userCollection = db.collection('user');
    });

var router = express.Router();

router.use(function(req, res, next){
    console.log('Something is happening');
    next();
});

router.get('/', function(req, res){
    res.json({ 
        message: "Ura! Bun venit la api-ul nostru al aplicatiei Bentley!",
    });
    
});

router.post('/car', async function(req, res){
    var item = {
        VIN: req.body.VIN,
        fuel: req.body.fuel,
        kilometers: req.body.kilometers,
        closed: true,
        converted: false,
        light: false,
        doorsOpen: false,
        alarm: true,
        temperature: req.body.temperature,
        chairDistance: req.body.chairDistance,
        chairUngle: req.body.chairUngle
    };

    await carCollection.insertOne(item);
    res.end();
});
router.get('/car', async function(req, res){
    let cars = await carCollection.find().toArray();
    if(!cars)
        res.send.status(401).end();
    res.json(cars);
    console.log(cars);
});

app.use('/',router);

app.listen(port);
console.log('Magin happens on port ' + port);