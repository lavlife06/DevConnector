const connectDB = require('./config/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
  console.log('Its running dont worry');
});
