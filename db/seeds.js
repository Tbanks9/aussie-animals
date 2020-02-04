const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Animal = require('../models/animal')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'TimBanks',
          email: 'tim@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => {
      console.log(`${'👩‍🚒'.repeat(createdUsers.length)} users created`)
      return Animal.create([
        {
          name: 'Great white shark',
          habitat: 'Ocean',
          scareFactor: 5,
          venomous: false,
          image: 'https://pvtistes.net/wp-content/uploads/2013/08/shutterstock_115604500.jpg',
          description: 'The great white shark is a famous predator but its reputation as a man-eater is pretty unfair—Hollywood helped built this crippling image. Myths die hard, but the truth is that human-caused shark mortality is continuing, primarily from accidental and illegal catches in commercial and recreational fishing.',
          user: createdUsers[0]
        }, {
          name: 'Box jellyfish',
          habitat: 'Ocean',
          scareFactor: 4,
          venomous: true,
          image: 'https://pvtistes.net/wp-content/uploads/2019/05/jellyfish.jpg',
          description: 'It doesn’t often kill swimmers, yet the box jellyfish usually has a 10/10 danger rating. It’s said to be the most toxic animal on earth with venom containing toxins that attack the heart, nervous system, and skin. You will find it (… and avoid it!) in Northern Australia, especially between October and May.',
          user: createdUsers[0]
        }, {
          name: 'Saltwater crocodile',
          habitat: 'Ocean',
          scareFactor: 5,
          venomous: false,
          image: 'https://pvtistes.net/wp-content/uploads/2013/08/saltwater-crocodile.jpg',
          description: 'Salties are huge, aggressive and opportunistic. They eat small and big animals, including humans, although it’s still fairly rare (24 deadly attacks between 1975 and 2009). Still, make sure it’s safe to swim and avoid swamps.',
          user: createdUsers[0]
        }, {
          name: 'Sydney funnel web spider',
          habitat: 'Cool, humid places',
          scareFactor: 3,
          venomous: true,
          image: 'https://pvtistes.net/wp-content/uploads/2013/08/funnel-web-spider.jpg',
          description: 'This small spider (1–5 cm) loves to hide in cool, humid places—including under rocks, logs or in your shoes. In New South Wales, they can take shelter in homes if the weather is particularly hot (yes, even if you never invited them).',
          user: createdUsers[0]
        }, {
          name: 'Taipan snake',
          habitat: 'Desert',
          scareFactor: 3,
          venomous: true,
          image: 'https://pvtistes.net/wp-content/uploads/2013/08/taipan.jpg',
          description: 'The most venomous snake in the world is endemic to Australia and lives in the desert. On the bright side, it tends to slither away from humans rather than fight them—only a handful of people have been bitten by this species and yes, they survived.',
          user: createdUsers[0]
        }
      ])
    })
    .then(createdAnimals => console.log(`${(createdAnimals.length)} animals created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})