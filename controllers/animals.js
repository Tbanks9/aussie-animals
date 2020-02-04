const Animal = require('../models/animal')

function index(req, res) {
  Animal
    .find()
    .then(foundAnimals => res.status(200).json(foundAnimals))
    .catch(err => console.log(err))
}

function create(req, res) {
  req.body.user = req.currentUser
  Animal
    .create(req.body)
    .then(createdAnimal => res.status(201).json(createdAnimal))
    .catch(err => console.log(err))
}

function show(req, res) {
  Animal
    .findById(req.params.id)
    .then(animal => res.status(202).json(animal))
  console.log(res)
    .catch(err => console.log(err))
}

function update(req, res, next) {
  Animal
    .findById(req.params.id)
    .then(animal => {
      if (!animal) return res.status(404).json({ message: 'Not Found' })
      Object.assign(animal, req.body)
      animal.save()
    })
    .then(animal => res.status(202).json(animal))
    .catch(next)
}

function deleteItem(req, res) {
  Animal
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

function commentCreate(req, res, next) {
  req.body.user = req.currentUser
  Animal
    .findById(req.params.id)
    .then(animal => {
      if (!animal) return res.status(404).json({ message: 'Not Found' })
      animal.comments.push(req.body)
      return animal.save()
    })
    .then(animal => res.status(201).json(animal))
    .catch(next)
}

function commentDelete(req, res) {
  Animal
    .findById(req.params.id)
    .then(animal => {
      if (!animal) return res.status(404).json({ message: 'Not Found' })
      const comment = animal.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).json({ message: 'Unauthorized' })
      } else {
        return animal.save().then(() => res.sendStatus(204))
      }
    })
    .catch(err => res.json(err)) //send any errors
}

module.exports = { index, create, show, update, deleteItem, commentCreate, commentDelete }