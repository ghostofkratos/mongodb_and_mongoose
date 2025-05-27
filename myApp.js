require('dotenv').config();
const mongoose = require("mongoose");





let Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false,
    unique: false
  },
  favoriteFoods: {
    type: [String],
    required: true
  },
});

const arrayOfPeople = [
  { name: 'John Doe', age: 42, favoriteFoods: ['Pizza', 'Burger'] },
  { name: 'Mary Jane', age: 28, favoriteFoods: ['Sushi', 'Salad'] },
  { name: 'Alice Smith', age: 35, favoriteFoods: ['Pasta', 'Ice Cream'] },
  { name: 'Charlie Brown', age: 22, favoriteFoods: ['Tacos', 'Steak'] },
  { name: 'David Johnson', age: 30, favoriteFoods: ['Burrito', 'Fries'] },
  { name: 'Emily Davis', age: 27, favoriteFoods: ['Sandwich', 'Cake'] },
  { name: 'Frank Miller', age: 40, favoriteFoods: ['Hot Dog', 'Chips'] },
  { name: 'Grace Lee', age: 31, favoriteFoods: ['Salmon', 'Rice'] },
  { name: 'Henry Wilson', age: 29, favoriteFoods: ['Curry', 'Noodles'] },
];

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
   const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
// createManyPeople(arrayOfPeople, (err, data) => {
//   if (err) {
//     console.error("Error creating many people:", err);
//   } else {
//     console.log("Many people created:", data);
//   }
// });
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
// findPeopleByName(/John/, (err, data) => {
//   if (err) {
//     console.error("Error finding people by name:", err);
//   } else {
//     console.log("People found by name:", data);
//   }
// });
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
findOneByFood("Pizza", (err, data) => {
  if (err) {
    console.error("Error finding one by food:", err);
  } else {
    console.log("Person found by food:", data);
  }
});

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data) =>{
    if (err) return done(err);
    done(null, data);
  })
};

findPersonById("682c74df3c4aca1dbcc6ad77", (err, data) => {
  if (err) {
    console.error("Error finding person by ID:", err);
  } else {
    console.log("Person found by ID:", data);
  }
});

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// findEditThenSave("682c34737a284c33b457da7c", (err, data) => {
//   if (err) {
//     console.error("Error finding, editing, and saving:", err);
//   } else {
//     console.log("Person found, edited, and saved:", data);
//   }
// });

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName }, {age: ageToSet}, { new: true }, (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  
};

// findAndUpdate("Mary Jane", (err, data) => {
//   if (err) {
//     console.error("Error finding and updating:", err);
//   }else {
//     console.log("Person found and updated:", data);
//   }
// });

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });

  done(null /*, data*/);
};

queryChain((err, data) => {
  if (err) {
    console.error("Error in query chain:", err);
  } else {
    console.log("Query chain results:", data);
  }
});

// createAndSavePerson((err, data) => {
//   if (err) {
//     console.error("Error creating and saving person:", err);
//   } else {
//     console.log("Person created and saved:", data);
//   }
// });



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
