const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Getting the username and the room from the URL
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join a chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

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

  //Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
})

// Message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add("message");
  div.innerHTML = `
  <p class = "meta"> ${message.username} <span>${message.time}</span></p>
  <p class="text"> 
  ${message.text}
  </p>`   
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});