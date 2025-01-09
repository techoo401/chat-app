const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// App initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Broadcast messages to all clients except the sender
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
