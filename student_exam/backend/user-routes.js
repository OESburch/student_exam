var express = require('express'),
  _ = require('lodash'),
  config = require('./config'),
  User = require('./schema/userSchema'),
  jwt = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'sonxai',
  password: 'password',
  usertype: 'admin'

}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, {
    expiresInMinutes: 60 * 5
  });
}

app.post('/user', function (req, res) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  User.find({
    userName: req.body.username
  }, function (err, result) {
    if (result.length > 0) {

      return res.status(400).send("A user with that username already exists");
    } else {

      let newUser = new User({
        userType: req.body.extra,
        userName: req.body.username,
        userPassword: req.body.password,
        userDone: true
      });


      newUser.save((err,result) => {
        if (err) {
          res.json(err);
        } else {
          res.status(201).send({
            id_token: createToken(newUser)
          });
        }
      });
    }

  });

});

app.get('/users', (req, res, next) => {
  User.find((err, items) => {
    if (err) {
      res.json(err);
    } else {
      res.json(items);
    }
  })
})

app.put('/user/:id', (req, res, next) => {
  User.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        userType: req.body.extra,
        userName: req.body.username,
        userPassword: req.body.password,
        userDone: true
      }
    },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          msg: 'updated successfully'
        });
      }
    }
  )
});

app.delete('/user/:id', (req, res, next) => {
  User.remove({
    _id: req.params.id
  }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})

app.post('/sessions/create', function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  User.find({
    userName: req.body.username,
    userPassword: req.body.password
  }, function (err, result) {


    if (result.length == 0) {
      return res.status(401).send("The username or password don't match");

    } else {
      res.status(201).send({
        id_token: createToken(result),
        userInfo: result
      });

    }

  });

});