const sendButton = document.getElementById('sendButton');
const messageBox = document.getElementById('messageBox');
const textBox = document.getElementById('textBox');
const socket = io(); // Initialize socket connection

// Function to create and append messages
function appendMessage(content, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = content;
    messageBox.appendChild(messageDiv);
    messageBox.scrollTop = messageBox.scrollHeight; // Scroll to the bottom
}

// Send message on button click or Enter key
function sendMessage() {
    const userMessage = textBox.value.trim();
    if (userMessage) {
        appendMessage(userMessage, 'sent'); // Append user message locally
        socket.emit('chat message', userMessage); // Emit message to server
        textBox.value = ''; // Clear textbox
    }
}

// Listen for button click
sendButton.addEventListener('click', sendMessage);

// Listen for Enter key
textBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendMessage();
});

// Listen for server messages
socket.on('chat message', (msg) => {
    appendMessage(msg, 'received'); // Append received message
});
