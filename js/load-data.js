// Gli oggetti ci servono per avere dei metodi, avessi bisogno solo dei dati non servirebbe. Una volta ottenuto un json
// dal server devo ricostruirlo assegnandoci i metodi propri di quell'oggetto.

const fs = require('fs');


//import {Collector, User} from "./user.js";
//import {Plant} from "./collectable.js";
const {Plant} = require("./collectable.js");
const {User, Collector} = require("./user.js");

const createApp = () => {
    const app = {
        users: {},
        plants: {}
    }

    initPlants(app);
    initUsers(app);

    app.getUserPlants = (username) => {
        return app.users[username]
            ._collection
            .map(elem => elem.collectable);
    }

    return app; // returning a promise of the app obj
}


// Initialized plants data
const initPlants = (app) => {

    fs.readFile('./data/plants.json', (err, data) => {
        if (err) throw err;
        const plants = JSON.parse(data);

        for (let plant of plants) {
            app.plants[plant.name] = new Plant(plant.name, plant.description, plant.img, plant.origin, plant.group,
                plant.meaning, plant.climate, plant.bloom, plant.handle, plant.rarity, plant.sun, plant.water,
                plant.discovery);
        }
    })
}


// Initialized users data
const initUsers = (app) => {
    fs.readFile('./data/users.json', (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data);

        for (let user of users) {
            // If the user is a collector..., else...
            if (user.collector) {
                app.users[user.name] = new Collector(user.name, user.surname, user.age, user.sentence, user.img, user.job, user.collector);
                for (let plant of user.items) {
                    app.users[user.name].collect(app.plants[plant]); // assign items to the user's collection
                }
            } else {
                app.users[user.name] = new User(user.name, user.surname, user.age, user.sentence, user.img, user.job, user.collector);
            }
        }
    })
}


// Simulate a loans once users and plants have been initialized
function simulateLoan(app) {
    app.users["Alice"].loan(app.plants["Caper"], app.users["Matteo"]);
    app.users["Alice"].loan(app.plants["Rafflesiaceae"], app.users["Celia"]);
    app.users["Alice"].loan(app.plants["Sansevieria"], app.users["Celia"]);
    app.users["Matteo"].loan(app.plants["Drosera capensis"], app.users["Alice"]);
    app.users["Matteo"].loan(app.plants["Venus Flytrap"], app.users["Alice"]);
}

module.exports = {createApp};