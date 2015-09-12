/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    dbConnection.query("SET FOREIGN_KEY_CHECKS = 0");
    var tablename = "messages"; // TODO: fill this out
    dbConnection.query("truncate " + tablename);
    tablename = "users";
    dbConnection.query("truncate " + tablename);
    tablename = "rooms";
    dbConnection.query("truncate " + tablename);
    dbConnection.query("SET FOREIGN_KEY_CHECKS = 1", done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted user to the DB", function(done) {
    // Post the user to the chat server.
    request({ 
      method: "POST",
      uri: "http://127.0.0.1:3000/classes/users",
      json: { username: "Aliyah" }
    }, function () {
      // Now if we look in the database, we should find the
      // posted message there.

      // TODO: You might have to change this test to get all the data from
      // your message table, since this is schema-dependent.
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        // Should have one result:
        expect(results.length).to.equal(1);

        // TODO: If you don't have a column named text, change this test.
        expect(results[0].name).to.equal("Aliyah");

        done();
      });
    });
  });

  it("Should insert posted room to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/rooms",
              json: { roomname: "Party" }
    }, function () {
      // Now if we look in the database, we should find the
      // posted message there.

      // TODO: You might have to change this test to get all the data from
      // your message table, since this is schema-dependent.
      var queryString = "SELECT * FROM rooms";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        // Should have one result:
        expect(results.length).to.equal(1);

        // TODO: If you don't have a column named text, change this test.
        expect(results[0].name).to.equal("Party");

        done();
      });
    });
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ 
      method: "POST",
      uri: "http://127.0.0.1:3000/classes/users",
      json: { username: "Valjean" }
    }, function () {
      // Post the room to the chat server.
      request({
        method: "POST",
        uri: "http://127.0.0.1:3000/classes/rooms",
        json: {
          roomname: "Hello"
        }
      }, function () {
        // Post a message to the node chat server:
        request({ 
          method: "POST",
          uri: "http://127.0.0.1:3000/classes/messages",
          json: {
            username: "Valjean",
            message: "In mercy's name, three days is all I need.",
            roomname: "Hello"
          }
        }, function () {

          // Now if we look in the database, we should find the
          // posted message there.

          // TODO: You might have to change this test to get all the data from
          // your message table, since this is schema-dependent.
          var queryString = "SELECT * FROM messages";
          var queryArgs = [];

          // Print time because measuring asynchrounous timing
          // Need to somehow refactor into callback
          console.log('Time when SELECT is executed: ' + (new Date()).getTime());
          dbConnection.query(queryString, queryArgs, function(err, results) {
            console.log('Time when SELECT is finished: ' + (new Date()).getTime());
            // Should have one result:
            expect(results.length).to.equal(1);

            // TODO: If you don't have a column named text, change this test.
            expect(results[0].message).to.equal("In mercy's name, three days is all I need.");

            done();
          });
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       var tablename = "messages"; // TODO: fill this out
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

      var insertUser = 'INSERT INTO users (name) VALUES (\'Derrick\')';
      dbConnection.query(insertUser);
      var insertRoom = 'INSERT INTO rooms (name) VALUES (\'main\')';
      dbConnection.query(insertRoom);
      var insertMessageB = 'INSERT INTO messages (userID, message, roomID) VALUES (1, \'Men like you can never change!\', 1)';
      dbConnection.query(insertMessageB);
      var insertMessageA = 'INSERT INTO messages (userID, message, roomID) VALUES (1, \'Hello World\', 1)';
      dbConnection.query(insertMessageA);
      var queryString = 'INSERT INTO messages (userID, message, roomID) VALUES (1, \'Goodbye World\', 1)';
      var queryArgs = [];
      // dbConnection.query(insertMessageB);
    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].message).to.equal("Men like you can never change!");
        expect(messageLog[0].roomID.toString()).to.equal("1");
        done();
      });
    });
  });
});
