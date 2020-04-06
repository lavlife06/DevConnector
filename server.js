const connectDB = require('./config/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// implementing cors
// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Connect database
connectDB();

// Init bodyParser middleware
app.use(express.json({ extended: false })); // This is equal to use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hello');
});

// Define routes
app.use('/api/login', require('./routes/api/login'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/signup', require('./routes/api/signup'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => {
  console.log(`Its running on ${PORT} dont worry`);
});
