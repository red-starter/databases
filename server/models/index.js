var db = require('../db');

function mysql_real_escape_string (str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\"+char; // prepends a backslash to backslash, percent,
                          // and double/single quotes
    }
  });
}

module.exports = {
  messages: {
    get: function (callback) {
      var queryString = 'SELECT * FROM messages';
      console.log("GET MESSAGES QUERY: " + queryString);
      db.query(queryString, [], function (err, results) {
        if (err) {
          console.log('Err (SELECT * FROM messages) models.messages.get: ' + err);
          console.dir(err);
        } else {
          console.log('Result (SELECT * FROM messages) models.messages.get: ' + results);
          console.dir(results);
          callback(results);
        }
      });
    }, // a function which produces all the messages
    post: function (username, message, roomname) {
      var queryString = 'INSERT INTO messages (userID, message, roomID) VALUES ((SELECT ID FROM users WHERE name=?), ?, (SELECT ID FROM rooms WHERE name=?))';
      console.log("POST MESSAGES QUERY: " + queryString);
      db.query(queryString, [username, message, roomname], function (err, results) {
        if (err) {
          console.log('Err (INSERT INTO messages) models.messages.post: ' + err);
          console.dir(err);
        } else {
          // Print time because measuring asynchrounous timing
          console.log('Time when INSERT is finished: ' + (new Date()).getTime());
          console.log('Result (INSERT INTO messages) models.messages.post: ' + results[0]);
          console.dir(results);
        }
      });
      // var userID;
      // var roomID;
      // db.query('SELECT ID FROM users WHERE name=?', [username], function (err, results) {
      //   if (err) {
      //     console.log('Err (SELECT ID FROM users) models.messages.post: ' + err);
      //     console.dir(err);
      //   } else {
      //     console.log('Result (SELECT ID FROM users) models.messages.post: ' + results[0]);
      //     console.dir(results[0]);
      //     userID = results[0]['ID'];
      //     db.query('SELECT ID FROM rooms WHERE name=?', [roomname], function (err, results) {
      //       if (err) {
      //         console.log('Err (SELECT ID FROM rooms) models.messages.post: ' + err);
      //         console.dir(err);
      //       } else {
      //         console.log('Result (SELECT ID FROM rooms) models.messages.post: ' + results[0]);
      //         console.dir(results[0]);
      //         roomID = results[0]['ID'];
      //         console.log('userID: ' + userID + ', message: ' + message + ', roomID: ' + roomID);
      //         var queryString = 'INSERT INTO messages (userID, message, roomID) VALUES (?, ?, ?)';
      //         console.log("POST MESSAGE QUERY: " + queryString);
      //         db.query(queryString, [userID, message, roomID], function (err, results) {
      //           if (err) {
      //             console.log('Err (INSERT INTO messages) models.messages.post: ' + err);
      //             console.dir(err);
      //           } else {
      //             console.log('Result (INSERT INTO messages) models.messages.post: ' + results);
      //             console.dir(results);
      //             console.log('Time when INSERT is finished: ' + (new Date()).getTime());
      //             // callback();

      //             //////////////////

      //             // db.query('SELECT * FROM messages', function (err, results) {
      //             //   if (err) {
      //             //     console.log('Err (SELECT * FROM messages) models.messages.post: ' + err);
      //             //     console.dir(err);
      //             //   } else {
      //             //     console.log('Result (SELECT * FROM messages) models.messages.post: ' + results);
      //             //     console.dir(results[0]);
      //             //   }
      //             //   callback();
      //             // });

      //             //////////////////
      //           }
      //         });
      //       }
      //     });
      //   }
      // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username) {
      var queryString = 'INSERT INTO users (name) VALUES (?)';
      console.log("POST USER QUERY: " + queryString);
      db.query(queryString, [username], function (err, results) {
        if (err) {
          console.log('Err models.users.post: ' + err);
          console.dir(err);
        } else {
          console.log('Result models.users.post: ' + results);
          console.dir(results);
          // callback();
        }
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function () {},
    post: function (roomname) {
      var queryString = 'INSERT INTO rooms (name) VALUES (?)';
      console.log("POST ROOM QUERY: " + queryString);
      db.query(queryString, [roomname], function (err, results) {
        if (err) {
          console.log('Err models.rooms.post: ' + err);
          console.dir(err);
        } else {
          console.log('Result models.rooms.post: ' + results);
          console.dir(results);
          // callback();
        }
      });
    }
  }
};

