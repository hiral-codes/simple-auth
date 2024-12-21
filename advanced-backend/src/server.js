import app from './app.js';
import { connectDB } from './config/db.js';
import http from 'http';

// getting the port from .env    
const port = process.env.PORT || 8000;

// Created http server
const server = http.createServer(app);

// Function imported to connect MongoDB
connectDB();

server.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`);
});