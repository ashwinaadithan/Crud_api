const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
   }
});    

const { Car } = require('../models/car');


// Get All Cars
router.get('/api/cars', (req, res) => {
    Car.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// Get Single Car

router.get('/api/car/:id', (req, res) => {
    Car.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});

// Save Car
router.post('/api/car/add', upload.single('carImage'), (req, res) => {
    const carr = new Car({
        carName: req.body.carName,
        owner: req.body.owner,
        price: req.body.price,
        carImage: req.file.path
    });
    carr.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Car Added Successfully', addCar: data})
        } else {
           console.log(err);
        }
    });
});



// Update Car

router.put('/api/car/update/:id', (req, res) => {


    const carr = {
        owner: req.body.owner,
        price: req.body.price,
        carName: req.body.carName,
        carImage: req.file.path

    };
    Car.findByIdAndUpdate(req.params.id, { $set: carr }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Car Updated Successfully', updateCar: data})
        } else {
            console.log(err);
        }
    });
});





// Delete Car
router.delete('/api/car/:id', (req, res) => {

    Car.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Car deleted', deleteCar: data})
        } else {
            console.log(err);
        }
    });
});


module.exports = router;
