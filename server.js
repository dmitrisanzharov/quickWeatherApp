const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.json({limit: '1mb'}));
app.use(express.static('public'));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/location', async(req,res)=> {
    const {location} = req.body;
    console.log(location);

    const api_key = process.env.API_KEY;
    const res_api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=1&aqi=no&alerts=no`)
    const data_api = await res_api.json();
    res.json(data_api);

    const timestamp = Date.now();
    
    const {lat, lon, name} = data_api.location;
    
    const dbInsert = {latitude: lat, longitude: lon, city: name, time: timestamp}

    database.insert(dbInsert);

    // end of post
})

app.get('/api', (req,res)=> {
    database.find({}, (err, docs)=> {
        res.send(docs)
    })
})

const port = process.env.PORT || 1000; 

app.listen(port, ()=> console.log(`running on port: ${port}`))