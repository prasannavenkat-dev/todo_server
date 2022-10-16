const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())


const cors = require("cors");
app.use(cors(
    {
        origin:"*"
    }
));

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const port = process.env.PORT || 4000 ;
require('dotenv').config()
app.get("/getTodoList",async function(req,res){

    try {
        console.log(process.env.DB_URL);
        const clientInfo = await mongoClient.connect(process.env.DB_URL);
        const db = await clientInfo.db("todo");

        const result = await db.collection("todoList").find().toArray();
        clientInfo.close();
        res.send(result)
    } catch (error) {
        
    }
})

app.post("/saveTodoList",async function(req,res){


    try {
        const {data} =req.body;

        const clientInfo = await mongoClient.connect(process.env.DB_URL);
        const db = await clientInfo.db("todo");
        const list = await db.collection("todoList").insertMany(data);
        clientInfo.close();
        res.send("saved")

    } catch (error) {
        console.log(error);
    }
})

app.listen(port,()=>{
console.log(`server started on port ${port}`);
})