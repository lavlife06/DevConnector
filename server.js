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
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => {
  console.log('Its running dont worry');
});
