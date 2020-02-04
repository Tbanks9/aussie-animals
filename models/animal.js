const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true }, // the text of the comment
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } // the user who is making the comment, this is a referenced relationship
}, {
  timestamps: true
})

const animalSchema = new mongoose.Schema({ 
  name: { type: String, required: true, unique: true },
  habitat: { type: String, required: true },
  scareFactor: { type: Number, required: true, min: 1, max: 5 },
  venomous: { type: Boolean, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true, maxlength: 800 },
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Animal', animalSchema)