import express from 'express'
import bodyParser from 'body-parser'
import {promises as fs} from 'fs'

import {people} from './people'



//const { MongoClient, ServerApiVersion } = require('mongodb');
//var ObjectID = require('mongodb').ObjectId

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = "mongodb+srv://liugeyang:gerry@myclusterprovider.mhfbhk0.mongodb.net/?retryWrites=true&w=majority&appName=myClusterProvider";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


let app = express();
app.use(bodyParser.json())

app.get('/hello', (req,res)=>{
    res.send("Hello!")
})

app.get('/people', (req,res)=>{
    res.json(people)
})

app.get('/people/:name',  (req,res)=>{
    let {name}=req.params
    console.log(name)
    let person = people.find( x=> x.name.toLocaleLowerCase()===name.toLocaleLowerCase())
    res.json(person)
})

app.get("/file-data", async (req,res)=>{
    let data=await fs.readFile(__dirname + '/people-data.json')
    let people = JSON.parse(data)
    res.json(people)
})

app.post('/people', (req,res)=>{
    let newPerson = req.body;
    people.push(newPerson)
    res.json(people)

})

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

app.get('/api/users', async (req,res)=>{
    try {
        await client.connect();
        const users = await client.db("users").collection('users').find({}).toArray();
        res.send(users)    
    } 
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.get('/api/users/:id', async (req,res)=>{
    try {
        await client.connect();
        
        const users = await client.db("users").collection('users').find({_id: new ObjectId(req.params.id)}).toArray();
        res.send(users)    
    } 
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.post('/api/users', async (req,res)=>{
    try {
        let newPerson = req.body;
        people.push(newPerson)
        await client.connect();
        await client.db("users").collection('users').insertOne(newPerson);
        res.send(people)    
    } 
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.put('/api/users/:id', async (req,res)=>{
    try {
        let newPerson = req.body;
        await client.connect();
        await client.db("users").collection('users').replaceOne({_id: new ObjectId(req.params.id)},
             newPerson )
        res.send(newPerson)    
    } 
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})


app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})