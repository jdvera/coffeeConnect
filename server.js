// Dependencies  ========================================
const express = require("express");
const bodyParser = require('body-parser');
// const path = require("path");
// Sets up Passport =====================================
const passport = require('passport');
const session = require('express-session');


// Sets up the Express App  =============================
const PORT = process.env.PORT || 3010;
const db = require("./models");


// Sets up the Express app to handle data parsing -------/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
// For Passport -----------------------------------------/
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());


// Server Routes
require("./routes/passportRoutes.js")(app);

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


// Syncing our sequelize models and then starting our Express app
// =============================================================
// add { force: true } in ".sync()" function if writing db schema for first time.
db.sequelize.sync({ force: true }).then(function () {
	app.listen(PORT, function () {
		console.log(`🌎 ==> Server now on port ${PORT}!`);
		db.Groups.create({ groupName: "test", hashId: "1234", password: "test", reqPass: true }).then(function (dbPost) {
			console.log("added test user to Groups");
		});
	});
});
