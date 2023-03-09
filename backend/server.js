const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bball'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Missing username or password' });
      return;
    }
  
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
      if (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      res.status(200).json({ userId: results[0].id, name: results[0].name });
    });
  });

  app.post('/rating', (req, res) => {
    const { rating, userId, comment } = req.body;
  
    if (!rating) {
      res.status(400).json({ message: 'Missing rating value' });
      return;
    }
  
    connection.query('INSERT INTO ratings (user_id, rating, comment) VALUES (?, ?, ?)', [userId, rating, comment], (error, results, fields) => {
      if (error) {
        console.error('Error inserting rating into database:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
  
      res.status(200).json({ message: 'Rating inserted successfully' });
    });
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});