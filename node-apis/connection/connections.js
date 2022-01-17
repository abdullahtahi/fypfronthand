const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/fyp_ustaad_app', { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log('Connection established')
    }
})

module.exports = connection