const db = require("../models");
//TODO set up MongoDB Atlas so it works remotely
module.exports = {
    //user paths
    findAllUsers: function(req, res){
        db.User
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findUserByName: function(req, res){
        db.User
            .find(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createUser: function(req, res){
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateUser: function(req, res) {
        db.User
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    removeUser: function(req, res) {
        db.User
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    
    //game paths
    findAllRogueScores: function(req, res){
        db.HighScore
            .find(req.query)
            .sort({ rogueScore: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAllDinoScores: function(req, res){
        db.HighScore
            .find(req.query)
            .sort({ dinoScore: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findScoreByName: function(req, res){
        db.HighScore
            .find(req.params.name)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createScore: function(req, res){
        db.HighScore
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updatScore: function(req, res) {
        db.HighScore
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    removeScore: function(req, res) {
        db.HighScore
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}