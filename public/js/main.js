const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
  console.log(message);  
});

// Message Submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Getting message text values
  const msg = e.target.elements.msg.value;
  
  // Emitting a message to the server
  socket.emit('chatMessage', msg);
})