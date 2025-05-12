//require mongoose
const mongoose = require('mongoose')



const connectDB = async () => {
    try { //attente dela réponse de la connexion à la BD
        await mongoose.connect(process.env.DB_URI);
        console.log('Base de donnée connectée ...')
    } catch (error) {
        console.log('Problème de connexion à la BD', error)
    }
}


module.exports= connectDB