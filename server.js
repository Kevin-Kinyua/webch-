const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));
 
// Run when a client connects
io.on('connection', (socket) => {
    // console.log(`A new web socket connection ...`);
    
    // Welcome current user
    socket.emit('message', 'Welcome to WebCh@');

    // Broadcast when a user connects
    socket.broadcast.emit('message', `${socket.id} has joined the ch@.`);

    //Runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', `${socket.id} has left the ch@.`);
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', `${msg}`);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));