import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// const express = require("express");
// const app = express();

// app.listen(3001, () => {
//   console.log("your server is running on 3001~! yeah");
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>,
);

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   rootElement
// );