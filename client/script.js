// WebSocket
const chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/new/');

// DOM Elements
const messageInputDom  = document.querySelector('#message-input');
const messageContainer = document.querySelector('#message-container');
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-container');
const minimiseBtn = document.getElementById("minimise-btn");
const authToken = '';

// Sender - receiver Class
const senderClass = 'sender';
const recieverClass = 'receiver';

chatBtn.addEventListener("click", function(e){
  checkConnection();
  chatBox.style.display = 'block';
  this.style.display = 'none';
});

minimiseBtn.addEventListener("click", function(e){
  chatBtn.style.display = 'flex';
  chatBox.style.display = 'none';
});

chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  writeResponse(data.message, recieverClass, 'http://127.0.0.1:5500/images/sample.png')
}

/**
 * Creates a new paragraph with a specific class, adds the specified text to it,
 * and then appends it to the messages div. 
 * @param text
 * @param msgClass defined inside the CSS file
 * @param imgScr image source
 */
 function writeResponse(text, msgClass, imgScr) {
  'use strict';
  let paragraph = document.createElement('p');
  let imgContainer = document.createElement('img');
  imgContainer.src = imgScr;
  paragraph.className = msgClass;
  paragraph.innerHTML = text;
  paragraph.append(imgContainer);
  messageContainer.appendChild(paragraph);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

/**
 * Check if socket connected or not
 */
function checkConnection(){
  if (chatSocket !== null && chatSocket.readyState === WebSocket.OPEN) {
    writeResponse('Connected to chatbot', recieverClass, 'http://127.0.0.1:5500/images/sample.png')
  }
}

/**
 * Sends the chatMessage.
 */
 function sendChatMessage() {
  const message = messageInputDom.value;
    if (message !== '') {
      writeResponse(message, senderClass, 'http://127.0.0.1:5500/images/sample.png')
      chatSocket.send(JSON.stringify({
        'message': message,
        'username': 'John Doe'
      }));
      messageInputDom.value = '';
    }
  }

  /**
   * Sends the chatMessages on Enter key press 
   * @param e 
   */
  function onType(e) {
    if (e.keyCode === 13) {
      sendChatMessage();
    }
  }