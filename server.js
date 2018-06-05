// Dependencies  ========================================
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

// Sets up the Express App  =============================
const PORT = process.env.PORT || 3010;
const app = express();

// **Uncomment once we begin passport work**
// Sets up Passport =====================================
// const passport = require('passport');
// const session = require('express-session');
// const flash = require('connect-flash');

// Requiring our models for syncing
const db = require("./models");


// Sets up the Express app to handle data parsing -------/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// **Uncomment once we begin passport work**
// For Passport -----------------------------------------/
// app.use(flash());
// app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Server Routes
// =============================================================
// require("./routes/user-routes.js")(app, passport);
// require("./routes/shoesRoutes.js")(app);
// require("./routes/dressesRoutes.js")(app);
// require('./config/passport.js')(passport);
require("./routes/groupRoutes.js")(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Syncing our sequelize models and then starting our Express app
// =============================================================
// add { force: true } in ".sync()" function if writing db schema for first time.
db.sequelize.sync({ force: true }).then(function () {
	app.listen(PORT, function () {
		console.log(`🌎 ==> Server now on port ${PORT}!`);
		db.Groups.create({ groupName: "test", password: "test" }).then(function (dbPost) {
			console.log("added test user to Groups");
		})
	});
});
