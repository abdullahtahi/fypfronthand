const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/labour', { useNewUrlParser: true }, (error) => {
    // const connection = mongoose.connect('mongodb+srv://root:toor@fyp-ustaad-app.oo3mm.mongodb.net/fyp-ustaad-app?retryWrites=true&w=majority', { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log('Connection established')
    }
})

module.exports = connection