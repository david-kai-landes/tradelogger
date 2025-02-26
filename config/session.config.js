const session = require("express-session");

const MongoStore = require('connect-mongo');
 
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = app =>{

    app.set('trust proxy', 1);

    app.use(

        session({
            secret:process.env.SESSION_SECRET,
            resave:true,
            saveUninitialized: false,
            cookie:{
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: false,
                maxAge: 60000
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODG_URI || 'mongodb://localhost/tradelogger'
            })
        })
    )
}