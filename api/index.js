import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import cookieParser from 'cookie-parser'
import {Server} from 'socket.io';
import { createServer } from 'node:http';
import 'dotenv/config';
import authRouter from './routes/auth.route.js';
import Rooms from './socket/room.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    },
    connectionStateRecovery: {}
});


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("database is connected")
})

const __dirname = import.meta.dirname;
const __location = path.resolve();


app.get('/', (req, res, next) => {
    res.send('<h1>Hello world</h1>')
})

server.listen(3000, () => {
    console.log('Server started listening at port 3000')
})


const rooms = Rooms();
//Socket.io 
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (user, msg, roomdId) => {
        socket.join(roomdId);
        socket.to(roomdId).emit('chat message', user, msg)        
    })

    socket.on('room create', (user, callback) => {
        const roomId = rooms.addRoom();
        rooms.addUserToRoom(roomId,user);
        callback(roomId);
    })
});






app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

app.use('/api/auth', authRouter);


//serves frontend file
app.use(express.static(path.join(__location,'/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__location,'client','dist','index.html'));
})

//error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})