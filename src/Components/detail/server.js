const express = require('express');
const mysql = require('mysql');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

let data = '';

wss.on('connection', ws => {
  ws.on("message", function message(data, isBinary) {
    const msg = isBinary ? data : data.toString();
    console.log("msg" + msg + "\n\n");

    console.log("receive from client: ", msg);
    ws.send("send to client: echo " + msg);

    data = msg;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('disconnected');
  });
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12341234',
  database: 'oceanlab'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

connection.on('close', () => {
  const deleteQuery = 'DELETE FROM user';

  connection.query(deleteQuery, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL database', err);
    } else {
      console.log('Data deleted from MySQL database');
    }
  });
});

app.use(express.json());

app.post('/api/enroll', (req, res) => {
  const { did, uid, name } = req.body;

  const values = did.map((_, index) => [did[index], uid[index], name[index]]);
  const query = 'INSERT INTO user (did, uid, name) VALUES ?';

  connection.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error saving data to MySQL database', err);
      res.status(500).json({ error: 'Failed to save data to database' });
    } else {
      console.log('Data saved to MySQL database');
      res.status(200).json({ success: true });
    }
  });
});

app.get('/Home2', (req, res) => {
  res.send('Welcome to the home page');
});

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});