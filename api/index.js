import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import cookieParser from 'cookie-parser'
import {Server} from 'socket.io';
import { createServer } from 'node:http';
import 'dotenv/config';

const app = express();
const server = createServer(app);

const __dirname = import.meta.dirname;
const __location = path.resolve();


app.get('/', (req, res, next) => {
    res.send('<h1>Hello world</h1>')
})

server.listen(3000, () => {
    console.log('Server started listening at port 3000')
})


app.use(express.static(path.join(__location,'/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__location,'client','dist','index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})