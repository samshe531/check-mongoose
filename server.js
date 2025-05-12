// 1 require express
const express = require('express')

// 2 instance of express
const app = express()

// 3 require de dotenv
require('dotenv').config()

// 7 connexion BD
const connectDB = require ('./config/connectDB')
const Person = require('./models/Person')
connectDB()

// 6 exemple route
app.get('/', (req,res) =>{
    res.json('ceci est un test de ma route')
})

//CRUD
//create one
const newPerson = {
    name:"Amin",
    age:17,
    favouriteFoods:['Pizza', 'pattes']
}
async function createPerson(newP) {
    try {
        const newDoc = await new Person(newP).save();
            console.log('la personne a été ajouté avec succés', newDoc)
        
    } catch (error) {
        console.log("une erreur s'est produite" , error);
    }
}
//l'appel de la fonction insertOne
// createPerson(newPerson)

//insertMany 
const arrayOfPeople = [
  { name: "Ali", age: 30, favouriteFoods: ["Couscous", "Ojja"] },
  { name: "Sami", age: 25, favouriteFoods: ["Pizza", "Burgers"] },
  { name: "Leila", age: 28, favouriteFoods: ["Makloub", "Pâtes"] },
];

async function createManyPeople(peopleArray) {
  try {
    const result = await Person.insertMany(peopleArray);
    console.log(" la liste a été bien inséré:", result);
  } catch (err) {
    console.error(" Erreur d'insertion de la liste de pesonnes:", err);
  }
}
//createManyPeople(arrayOfPeople);
// ----------------------------------------------------------------

//Read
async function listPerson() { 
    try {
        listDocs = await Person.find()
        console.log("la liste de toutes les personnes de cette collection sont", listDocs)
    } catch (error) {
        console.log("impossible de lire cette liste:", error)
    }
}
// listPerson()
async function findPersonByName(nom) {
    try {
        const docName = await Person.find({name:nom});
        if (docName.length === 0){
            return console.log("il n'existe acune personne dans la liste avec le nom:", nom)
        }
        console.log("la personne recherchée par son nom est", docName)
    } catch (error) {
        console.log("erreur de recherche", error)
    }
}
// findPersonByName("Issam")

async function findPersonById(id) {
    try {
        const docId = await Person.findById(id)
        
        console.log("la personne recherchée avec cette id est", docId)
    } catch (error) {
        console.log("erreur de recherche", error)
    }
}
// findPersonById("6821d1bb22fa4c8b4e99e327")
// -----------------------------------------------------------------------

// UPDATE
async function updatePerson(id, ageToEdit) {
    try {
        const docUpdated = await Person.findByIdAndUpdate(
            id,
            { $set: { age: ageToEdit }} ,
            {new : true}
        );
        if (!docUpdated) {
            return console.log("personne non trouvé")
        }
        
        console.log("mise à jour de l'age réussite", docUpdated)
    } catch (error) {
        console.log( error)
    }
}

// updatePerson("6821d1bb22fa4c8b4e99e327", 20)
















// 4 PORT
const PORT = process.env.PORT

// 5 serveur 
app.listen(PORT, (err) => {
    err
    ? console.log(err)
    : console.log(`le serveur est fonctionnel sur le port : http://localhost:${PORT}`);
})