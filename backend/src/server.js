const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

require('dotenv').config();
// const connectDB = require('./config/database');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongodb connect > driver

const uri = `${process.env.MONGODB_URI}`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // fetching from db
    const productsCollection = client.db('test').collection('products')

    app.get('/products', async (req, res) => {
        const cursor = productsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('backend of smartTemu')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;



// app.use(express.urlencoded({ extended: true }));

// connectDB();

// const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         success: false,
//         message: 'Something went wrong!',
//         error: process.env.NODE_ENV === 'development' ? err.message: {}
//     });
// });


// Health check
// app.get('/api/health', (req, res) => {
//     res.json({ status: 'OK' });
//   });

// app.use((req, res, next) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found'
//     });
// });


