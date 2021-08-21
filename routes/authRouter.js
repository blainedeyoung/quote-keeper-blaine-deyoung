const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//// SIGNUP 
authRouter.post("/signup", (req, res, next) => {
    // does a user by that name already exist
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(500)
            return next(new Error("That username is already taken."))
        }
        // Create the user
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // What does the front-end need?   User object, token
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ user: savedUser.withoutPassword(), token })
        })
    })
})

//// LOGIN 
authRouter.post("/login", (req, res, next) => {
    // Find the user by their username, to see if they exist
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        // does user exist?
        if(!user){
            res.status(500)
            return next(new Error("Username or password are incorrect"))
        }
        // does their password match the password in the DB
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(401)
                return next(err)
            }
            if(!isMatch){
                res.status(401)
                return next(new Error("Username or password are incorrect"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ user: user.withoutPassword(), token })
        })
    })
})

module.exports = authRouter