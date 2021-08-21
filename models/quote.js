const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    attributedTo: {
        type: String
    },
    source: {
        type: String
    },
    comments: {
        type: String
    },
    permissions: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Quote", quoteSchema)