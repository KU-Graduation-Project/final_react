// import WebSocket, { WebSocketServer } from "ws";
// const { Server } = require('http');

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port:8080 });

// let data = '';

// wss.on('connection', ws => {
//     ws.on("message", function message(data, isBinary) {
//         const msg = isBinary ? data : data.toString();
//         console.log("msg"+msg + "\n\n");

//         // ws.send("send to client: echo ", JSON.parse(msg)) // python 으로 데이터 보낸다, python에서 data 변수에 들어감
//         console.log("receive from client: ", msg)
//         ws.send("send to client: echo " + msg)

//         data = msg;
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data);
//             }
//         })
//         // wss.clients.forEach((client) => {
//         //     if (client.readyState === WebSocket.OPEN) {
//         //         client.send(data);
//         //     }
//         // })
//       });

//     ws.on('close', ()=> {
//         console.log('disconnected');
//     });

// });

const express = require('express');
const mysql = require('mysql');
const app = express();

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

// process.on('exit', () => {
//   const deleteQuery = 'DELETE FROM user';

//   connection.query(deleteQuery, (err, result) => {
//     if (err) {
//       console.error('Error deleting data from MySQL database', err);
//     } else {
//       console.log('Data deleted from MySQL database');
//     }
//     // 연결 종료
//     connection.end();
//   });
// });

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});