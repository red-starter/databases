var models = require('../models');

// We can essentially make all these functions take in a callback where
// we pass in res.end()

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        res.send(data);
        res.end();
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body.username, req.body.message, req.body.roomname);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body.username);
      res.end();
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.rooms.post(req.body.roomname);
      res.end();
    }
  }
};

