var express = require('express');
var router = express.Router();
var mongo = require('./mongo_connection');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;


router.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
router.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

var imageCache = {}

function getDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}


function validateInput(data){
    let errors = {};
    if(Validator.isEmpty(data.username)){
        errors.username = 'This field is required';
    }
    if(Validator.isEmpty(data.password)){
        errors.password  = 'This field is required';
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
}

function insertdb(collection, record, callback){
    var insertUser = function(err,db){
        db.collection(collection).insert(record, callback)
        db.close();
    }
    mongo.connect(insertUser);
}

function getImageWithinDistance(collection, latitude, longitude, distance, callback) {
    var getResults = function(err, db) {
        db.collection(collection).find({
            'location': {
                "$nearSphere": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "$maxDistance": distance
                }
            }
        }).toArray(function(err, results) {
            if (err) {
                console.log(err)
            } else if (results.length) {
                console.log(results);
                callback(results)
            } else {
                callback([])
            }
            db.close();
        })
    }
    mongo.connect(getResults);
}


/**
 * @params: lat: current latitude
 * @params: lon: current longitude
 * @params: distance: filter distance
 */
function getImageByDistance(collection, lat, lon, distance, callback){
    var getData = function(err, db){
        db.collection(collection).find().toArray(function(err, result){
            if (err) {
                console.log(err);
            } else {
                var res = { images: [] };
                for(index in result){
                    if( getDistance(lat, lon, result[index]['latitude'], result[index]['longitude'], "K") <= distance ){
                       res.images.push(result[index]);
                    }
                }
                callback(res);
            }
            db.close();
        });
    }
    return mongo.connect(getData);
}


function getdbById(collection, id, callback) {
    var getResults = function(err, db) {
        db.collection(collection).findOne(ObjectId(id), function(err, result){
            if (err) {
                console.log(err);
            } else {
                callback(result)
            }
            //Close connection
            db.close();
        });
    }
    return mongo.connect(getResults);
}


function insertImage(record, callback){
    var insertImage = function(err, db){
        db.collection('Image').insert(record, callback)
        db.close();
    }
    mongo.connect(insertImage);
}


router.get('/test', function(req, res){
  console.log('test1');
});


router.post('/uploadImage', function(req, res) {
    var username = req.body.username
    var image = req.body.image
    var description = req.body.description
    var latitude = req.body.location.latitude
    var longitude = req.body.location.longitude
    var data = {
        "username": username,
        "image": image,
        "description": description,
        "location": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        }
    }

    insertImage(data, function(err, img) {
        if (!err) {
            console.log('Saved an image')
            res.status(200);
        } else {
            console.log('Save image failed')
            res.status(400);
        }
    })
});

router.get('/image/:id', function(req, res) {
    // if (req.params.id in imageCache) {
    //     var img = imageCache[req.params.id]
    //     res.writeHead(200, {
    //      'Content-Type': 'image/jpeg',
    //      'Content-Length': img.length
    //     });
    //     res.end(img);
    // } else {
        getdbById('Image', req.params.id, function(image) {
            if (image) {
                res.json({'image':image})
            } else {
                res.status(400);
            }
        });
    // }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

router.post("/getImageByUsername", function(req, res){
  var query = { username: req.body.username };
  getdb('Image', query, function(imageList){
      if(imageList){
          res.json(imageList);
      }else{
          res.status(400);
      }
  });
})


/*
example: filter = {"latitude": 123456, "longitude":2334567, "distance": 100}
*/
router.post("/getImageWithinDistance", function(req, res){
  var username = req.body.username
  var lat = req.body.location.latitude;
  var lon = req.body.location.longitude;
  var dis = req.body.distance;
  getImageWithinDistance('Image', lat, lon, dis, function(imageList){
      if(imageList){
          res.json(imageList);
      }else{
          res.status(400);
      }
  });
})

module.exports = router;
