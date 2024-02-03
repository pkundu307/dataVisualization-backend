const express = require('express');
const mongoose = require('mongoose');
const insightsRoutes = require('./Routes/insightsRoutes');
const path = require('path');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors'); // Import the cors package

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(cors()); // Apply CORS middleware
app.use(express.static(path.resolve(__dirname, 'build')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Routes
app.use('/api', insightsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const port = process.env.PORT || 8080; // Default port 3000

app.listen(port, () => console.log(`Server running on port ${port}`));

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
