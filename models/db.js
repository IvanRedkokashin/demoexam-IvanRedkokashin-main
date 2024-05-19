const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: './database/database.db'
})

const Users =  sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usersurname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    timestamps: false
});
const Scooters = sequelize.define("scooters", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    speed: {
        type: Sequelize.STRING,
        allowNull: false
    },
    powerreserve: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
{
    timestamps: false
});
const Equipements = sequelize.define("equipements", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
{
    timestamps: false
});
const Bookings = sequelize.define("bookings", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userid:{
        type: Sequelize.STRING,
        allowNull: false
    },
    bookingDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    bookingTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    scooterName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numberOfPeople: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    timestamps: false
});

module.exports = {Users, Scooters, Equipements, Bookings, sequelize};