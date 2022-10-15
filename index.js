const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())


const cors = require("cors");
app.use(cors());

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const dbUrl = "mongodb+srv://dbPractice:qdMxjaPavgeHfniU@expressroute.mfmma.mongodb.net/todoList?retryWrites=true&w=majority"

app.get("/getTodoList",async function(req,res){

    try {

        const clientInfo = await mongoClient.connect(dbUrl);
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

        const clientInfo = await mongoClient.connect(dbUrl);
        const db = await clientInfo.db("todo");
        const list = await db.collection("todoList").insertMany(data);
        clientInfo.close();
        res.send("saved")

    } catch (error) {
        console.log(error);
    }
})

app.listen(4000,()=>{
console.log("Server started on port 4000");
})