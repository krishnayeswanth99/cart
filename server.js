var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

var ObjectID = mongodb.ObjectID;

var database;

var PRODUCTS_COLLECTION = "products";


var app = express();

app.use(bodyParser.json());


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


const LOCAL_DATABASE = "mongodb://localhost:27017/app";
const LOCAL_PORT = 8080;


mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        if (error) {
            console.log(error);
            process.exit(1);
        }

        database = client.db();
        console.log("Database connection done.");

        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });


app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});


app.get("/api/products", function (req, res) {
    database.collection(PRODUCTS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});


app.post("/api/products", function (req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.delete("/api/products/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}