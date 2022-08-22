let mongoose = require('mongoose');


const Car = mongoose.model('Car', {
    carName: {
        type: String,
        required:true
    }, 
    owner: {
        type:String,
        required:true
    },
    price: {
        type:String,
        required:true
    },
    carImage: {
        type:String,
        required: true
    }
});



module.exports = {Car}