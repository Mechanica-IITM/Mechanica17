'use strict';

import User from './user.model';
import House from '../house/house.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}


/**
 * Creates a new user
 */
export function create(req, res) {

  if(req.body.rollNumber){
    var rollNumber = req.body.rollNumber.split(' ');
    rollNumber = rollNumber.join('').toUpperCase();
    console.log(rollNumber,222222);
    House.findOne({ "team.member": rollNumber})
    .exec()
    .then(house=>{

      var newUser = new User(req.body);
      console.log(house, 32333333333);

      if(house)
        newUser.house = house._id;

      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.save()
        .then(function(user) {
          var token = jwt.sign({ _id: user._id }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
          });
          res.json({ token });
        })
        .catch(validationError(res));
    })
  }
  else
    return res.send(400);
}

export function setHighScore(req, res, next){
  console.log(req.body.score);
  if(req.user.highscore<req.body.score)
    req.user.highscore = req.body.score;
  req.user.save()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

export function getHighScore(req, res, next){
  User.find({}, 'name highscore college').sort({highscore:-1}).limit(3)
  .then(respondWithResult(res))
  .catch(handleError(res));  
}

export function setScoreZero(req, res, next){
  console.log('here');
  User.update({}, {$set:{highscore:0}}, {multi:true})
  .then(respondWithResult(res))
  .catch(handleError(res));
}

export function contacts(req, res){
  var contacts =  [
      {
        type:'Secretary',
        profile:[{name:'M Vidyadhar', email:'m.vidyadhar95@gmail.com', phone:'9952044531'},
        {name:'S Chandra vadan', email:'scvchandras@gmail.com', phone:'9884181579'}
      ]},
      {
        type:'Joint Secretary',
        profile:[{name:'Ankit Jain',email:'bhaiji.ankitjain1993@gmail.com',phone:'9043807215'}]
      },
      {
        type:'Events',
        profile:[{name:'K Akhil',email:'akhilkollu96@gmail.com',phone:'9176493264'},
        {name:'M V Suhaas',email:'suhaasmekala@gmail.com',phone:'8220154858'}]
      },
      {
        type:'Student Relations',
        profile:[{name:'Naveen Kanna M',email:'naveenkanna28@gmail.com',phone:'9087295757'},
        {name:'T Sumanth Kalyan',email:'sumanth.kalyan79@gmail.com',phone:'9790465204'}]
      },
      {
        type:'Sponsorship & Public Relations',
        profile:[{name:'Hitesh Malla',email:'hitesh.m95@gmail.com',phone:'9087863969'},
        {name:'Kartheek K',email:'kartheek301096@gmail.com',phone:'9677077500'}]
      },
      {
        type:'Web & Mobile Operations',
        profile:[{name:'K Venkat Teja',email:'teja.kunisetty@gmail.com',phone:'7200317939'}]
      },
      {
        type:'Design & Media',
        profile:[{name:'M Ravi Theja',email:'ravithejamavuri@gmail.com ',phone:'9790464008'}]
      },
      {
        type:'Finance',
        profile:[{name:'B Bhanu Mitra',email:'bhanumitrab@gmail.com',phone:'9087863231'},
        {name:'S Maneesha Devi',email:'rajsridevi598@gmail.com',phone:'9790469606'}]
      },
      {
        type:'Facilities & Requirements',
        profile:[{name:'Cesh J',email:'ceshcool@gmail.com',phone:'9940451199'}]
      },
      {
        type:'QMS',
        profile:[{name:'S Bharath',email:'rocky.bharath1997@gmail.com',phone:'9791336202'}]
      }

    ];

    return res.json(contacts);
}
/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').populate('house').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}
/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
