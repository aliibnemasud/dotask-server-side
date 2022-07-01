const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('DoTask Port is Running..........')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dotask.isz5j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {

    try{
        await client.connect();
        const taskCollection = client.db('dotask').collection('alltask');

        // All Task

        app.get('/alltask', async (req, res) => {            
            const query = {};
            const cursor = taskCollection.find(query);
            const task = await cursor.toArray();
            res.send(task);
        })
        

        // Add new task

        app.post('/task', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })
        

    }
    finally{

    }
}

run()









app.listen(port, () => {
  console.log(`DoTask listen to port ${port}`)
})