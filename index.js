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
        const orderCollection = database.collection('myOrder')
        const reviewCollection = database.collection('reviews')

        // GET API
        app.get('/cars', async (req, res) => {
            const cursor = carsCollection.find({})
            const cars = await cursor.toArray()
            res.send(cars)
        })

        // GET ORDER API
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const cursor = orderCollection.find(query)
            const orders = await cursor.toArray()
            res.send(orders)
        })
        // GET MANAGE ORDER API
        app.get('/manage-orders', async (req, res) => {
            
            const cursor = orderCollection.find({})
            const orders = await cursor.toArray()
            res.send(orders)
        })

        // POST API

        app.post('/orders', async(req, res) => {
            const orderData = req.body;
            const result = await orderCollection.insertOne(orderData)
            console.log(result);
            res.json(result)
        })
        // POST REVIEW API

        app.post('/review', async(req, res) => {
            const reviewData = req.body;
            const result = await reviewCollection.insertOne(reviewData)
            console.log(result);
            res.json(result)
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