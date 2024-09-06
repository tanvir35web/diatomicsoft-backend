const express = require("express");
const cors = require('cors')

const app = express();

function corsConfig() {

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://diatomicsoft.vercel.app',
    'https://diatomicsoft-v1.vercel.app',
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

};

module.exports = corsConfig;