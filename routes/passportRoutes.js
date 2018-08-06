// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("---------------cb for POST /api/login-----------");
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json("/new-group");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        console.log("---------------signup-----------");
        console.log(req.body);
        db.Groups.create(req.body).then(function () {
            console.log("---------------signup successful, redirecting-----------");
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.status(422).json(err.errors[0].message);
        });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.send(true);
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({
                message: "Passport -- you are not logged in",
                loggedIn: false
            });
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                groupName: req.user.groupName,
                id: req.user.id,
                loggedIn: true
            });
        }
    });


    // ---------------------------------  No Password Below ---------------------------------
    

    //Routes if the user doesn't use a password
    app.post("/api/signupNoPass", function (req, res) {
        console.log("---------------signup NoPass-----------");
        db.Groups.create(req.body).then(function () {
            console.log("---------------NoPass signup successful, redirecting-----------");
            res.redirect(307, "/api/loginNoPass");
        }).catch(function (err) {
            console.log(err);
            res.status(422).json(err.errors[0].message);
        });
    });

    app.post("/api/loginNoPass", function(req, res) {
        db.Groups.findOne({
            where: {
                groupName: req.body.groupName
            }
        }).then(function(dbResponse) {
            if (dbResponse.reqPass) {
                res.json({ message: "This Group requires a Password" });
            }
            else {
                res.json("/new-group");
            }
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        })
    });
};
