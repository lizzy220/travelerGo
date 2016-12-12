var mongo = require('./mongo_connection');
var bodyParser  = require('body-parser');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');
// var bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');

// Everything that was in the file before goes here
app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
var port = process.env.PORT || 3000; // For when we deploy to Heroku
var server = app.listen(port)
var votes = [];
var nextTurn; // either computer's turn or player's turn
var canStart = true;
var ai = null;


app.get('/', function(req, res){
      console.log('shishi');
    })

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  socket.on('', function(data){
  })
  socket.on('', function(data){
  })
})


function insertdb(collection, record, callback){
    var insertUser = function(err,db){
        db.collection(collection).insert(record, callback)
        db.close();
    }
    mongo.connect(insertUser);
}

function getdb(collection, record, callback){
    var getUser = function(err, db){
        db.collection(collection).findOne(record, function(err, result){
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

// app.post("/uploadImage", function(req, res){
//   /*
//   data should like this
//   {
//     username: string,
//     image: string,
//     longitude: string,
//     latitude: string
//   }*/
//   var data = req.body;
//   insertdb('images', data, function(err, record) {
//       // console.log(err)
//       if (!err) {
//           console.log("Image uploaded");
//       } else {
//           res.status(400);
//       }
//   });
// })

app.post("/getImageByUsername", function(req, res){
  var query = { username: req.body.username };
  getdb('images', query, function(imageList){
      if(imageList){
          res.json(imageList);
      }else{
          res.status(400);
      }
  });
})

app.post("/getImageByDistance", function(req, res){

})

// app.post("/users", function(req, res){
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
//
// app.post("/auth", function(req, res){
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
// module.exports = router;
