const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessage = document.querySelector('chat-messages');

// Server Message
socket.on('message', message => {
  console.log(message);  
  outputMessage(message);

  // Scroll
  chatMessage.scrollTOp = chatMessage.scrollHeight;
});

// Message Submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
 
  // Getting message text values
  const msg = e.target.elements.msg.value;
  
  // Emitting a message to the server
  socket.emit('chatMessage', msg);
})

// Message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add("message");
  div.innerHTML = `
  <p class = "meta"> ${socket.id} <span>12:00pm</span></p>
  <p class="text"> 
  ${message}
  </p>`   
  document.querySelector('.chat-messages').appendChild(div);
}