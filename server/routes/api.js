var express = require('express');
var router = express.Router();
var mongo = require('./mongo_connection');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;


router.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
router.use(bodyParser.urlencoded({limit: '50mb', extended: true }));


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

function getdb(collection, query, callback){
    var getUser = function(err, db){
        db.collection(collection).find(query).toArray(function(err, result){
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
            db.close();
        });
    }
    return mongo.connect(getUser);
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
    var insert = function(err, db){
        db.collection('Image').insert(record, callback)
        db.close();
    }
    return mongo.connect(insert);
}

function deleteImage(oids, callback) {
    var remove = function(err, db) {
        db.collection('Image').remove({"_id": {"$in": oids}}, callback)
        db.close();
    }
    return mongo.connect(remove);
}


router.get('/test', function(req, res){
  console.log('test1');
});

router.post('/deleteImage', function(req, res) {
    var username = req.body.username
    var images =  req.body.images
    var imagesIds = images.map((id) => ObjectId(id))
    deleteImage(imagesIds, function(err) {
        if (!err) {
            console.log('removed some photos');
            res.status(200);
        } else {
            res.status(400);
        }
    })
})


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
    };
    console.log(data);

    insertImage(data, function(err, img) {
        if (!err) {
            console.log('Saved an image')
            res.json(img);
        } else {
            console.log('Save image failed')
            res.status(400);
        }
    });
});

router.get('/image/:id', function(req, res) {
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


// router.post("/users", function(req, res){
//     console.log(req.body);
//     const { errors, isValid } = validateInput(req.body);
//     var query = { username: req.body.username };
//     if(isValid){
//         getdb('users', query, function(userInfo){
//             if(userInfo){
//                 errors.username = 'Username already exist!';
//                 res.status(400).json(errors);
//             }else{
//                 res.json({success: true});
//                 encrypt_password = bcrypt.hashSync(req.body.password, 10);
//                 var data = {
//                     username: req.body.username,
//                     password: encrypt_password,
//                     saved: [],
//                     posts: []
//                 }
//                 insertdb('users', data, function(err, record) {
//                     // console.log(err)
//                     if (!err) {
//                         console.log("User inserted");
//                     } else {
//                         res.status(400);
//                     }
//                 });
//             }
//         });
//     }else{
//         res.status(400).json(errors);
//     }
// })

// router.post("/auth", function(req, res){
//     var data = { username: req.body.username };
//     console.log(data);
//     getdb('users', data, function(userInfo){
//         if(userInfo){
//             if(bcrypt.compareSync(req.body.password, userInfo.password)){
//                 const token = jwt.sign({
//                     username: userInfo.username
//                 }, 'nothingspecial');
//                 res.json({ token });
//             }else{
//                 res.status(401).json({errors: { form: 'Invalid Username or Password' } });
//             }
//         }else{
//             res.status(401).json({errors: { form: 'Invalid Username or Password' } });
//         }
//     });
// })
module.exports = router;
