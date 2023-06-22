const express = require('express');
const mysql = require('mysql');
const WebSocket = require('ws');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

let data = '';


wss.on('connection', (ws) => {
  console.log("socket open");
  ws.on('message', (message) => {
    //const msg = isBinary ? data : data.toString();
    const msg = message
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
  if (err) {
    console.error('Failed to connect to MySQL database', err);
    // 여기서 res 객체를 사용할 수 없음
  } else {
    connection.query('DROP TABLE if exists user');
    connection.query('CREATE TABLE user(did VARCHAR(45), uid VARCHAR(45), name VARCHAR(45))');
    console.log('Connected to the MySQL database');
  }
});

// post 요청 시 값을 객체로 바꿔줌
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/Home1');
});


app.post('/Home1', (req, res) => {
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

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
