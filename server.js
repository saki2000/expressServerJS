import express from "express";
import bodyParser from "body-parser";
import {people} from './people'
import {promises as fs} from 'fs';

let app = express();

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send("hey there you");
});

app.get('/people', (req, res ) =>{
    res.json(people);
});

app.get('/people/:name', (req, res ) => {
    let {name} = req.params;
    let person = people.find( x=> x.name === name);
    res.json(person);
});

app.get('/file-data', async (req, res) =>{
    let data = await fs.readFile(__dirname + '/peopleData.json');
    let people = JSON.parse(data);

    res.json(people);
});

app.post('/people', (req,res) => {
    let newPerson = req.body;
    people.push(newPerson);
    res.json(people);
});

app.listen(3000 , () =>{
    console.log("server listening on port 3000")
});
