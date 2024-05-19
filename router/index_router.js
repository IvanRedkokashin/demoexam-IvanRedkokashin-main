const express = require('express');
const rout = express();
require('dotenv').config();
const ejs = require('ejs');
const register = require('../controllers/register');
const login = require('../controllers/login');
const editDataUser = require('../controllers/editDataUser');
const admincontrollers = require('../controllers/admincontrollers');
const booking = require('../controllers/booking');

rout.get('/', booking.listScooters);
rout.post('/createrezerv', booking.createNewBooking);
rout.get('/register', function(req, res) {
    res.render('../views/registerForm')
});
rout.post('/register', register.submitIsForm);
rout.get('/login', function(req, res) {
    res.render('../views/loginForm')
});
rout.post('/login', login.submit);
rout.get('/logout', login.logout);
rout.get('/find', function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;

    res.render('../views/findUsPage', { userEmail, userName});
});
rout.get('/profile', booking.listbookingUser);

rout.post('/editEmail', editDataUser.updateEmail);
rout.post('/editName', editDataUser.updateName);

rout.get('/admincontrol', booking.listbookingAdmin);
rout.post('/addscoters', admincontrollers.createNewScooter);
rout.post('/addequipement', admincontrollers.createNewEquipement);

rout.post('/dellrezerved', admincontrollers.dellRezerved);
rout.get('/productlist', admincontrollers.listItems);
rout.post('/dellitemsscooter', admincontrollers.dellItemsScooter);
rout.post('/dellitemsequiments', admincontrollers.dellItemsEquiments);

module.exports = rout;