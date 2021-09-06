// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "tradelogger";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const trades = require("./routes/trades.route");
app.use("/trades", trades);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);



app.get('/signup', function(req, res) {
    User.findOne({username: req.query.username}, function(err, user){
        let errorMessage;
        if(err) {
          console.log(err);
        }
        
        if(user) {
          console.log(user)
          errorMessage = "user exists";
            console.log(errorMessage)
        } else {
            errorMessage= "user doesn't exist";
            console.log(errorMessage)
        }
        res.json({errorMessage: errorMessage});
    });
});






// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
