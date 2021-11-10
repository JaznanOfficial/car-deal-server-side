const express = require('express');
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkhtj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const run = async() => {
    try {
        await client.connect();
        const database = client.db('car-deal');
        const carsCollection = database.collection('cars')

        // GET API
        app.get('/cars', async (req, res) => {
            const cursor = carsCollection.find({})
            const cars = await cursor.toArray()
            res.send(cars)
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);








app.get('/', (req, res) => {
    res.send('server is getting data properly...')
})

app.listen(port, () => {
    console.log('server is running on port',port);
})