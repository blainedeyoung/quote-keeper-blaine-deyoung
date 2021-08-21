const express = require('express')
const quoteRouter = express.Router()
const Quote = require('../models/quote.js')

// Post 
quoteRouter.post("/", (req, res, next) => {
    // Add user ID to the Quote Object
    req.body.user = req.user._id
    const newQuote = new Quote(req.body)
    newQuote.save((err, savedQuote) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedQuote)
    })
})

// Get all quotes
quoteRouter.get("/", (req, res, next) => {
    Quote.find({permissions: "public"}, (err, quotes) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(quotes)
    })
})

// Get quotes by requesting user
quoteRouter.get("/user", (req, res, next) => {
    // Find the quotes that have .user that === the requesting.user's _id
    Quote.find({user: req.user._id}, (err, quotes) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(quotes)
    })
})

//get one quote by id
quoteRouter.get("/one/:_quoteId", (req, res, next) => {
    Quote.findOne({_id: req.params.quoteId}, 
        (err, quote) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(quote)
        })
})

// Edit quote
quoteRouter.put("/:_id", (req, res, next) => {
    Quote.findOneAndUpdate({_id: req.params._id}, req.body, 
    {new: true}, (err, updatedQuote) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedQuote)
    })
})

// Delete a Quote belonging to logged in user
quoteRouter.delete("/:_id", (req, res, next) => {
    Quote.findOneAndRemove(
        // find the quote with the req.params._id and make sure it has the same user ._id as the user requesting removal
        {_id: req.params._id, user: req.user._id}, 
        (err, deletedQuote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send({msg: `The quote by ${deletedQuote.source} was deleted`, deletedQuote})
    })
})

module.exports = quoteRouter