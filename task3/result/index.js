const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'vote_db',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('public'));

app.get('/results', async (req, res) => {
  try {
    const result = await pool.query('SELECT option, SUM(count) AS total_votes FROM votes GROUP BY option');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving results');
  }
});


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.listen(5001, () => {
  console.log('Results app listening on port 5001');
});
