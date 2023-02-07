// WebSocket

const url = window.location.host;
const chatSocket = new WebSocket('ws://'+ url +'/ws/chat/new/');

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
//const robotImage = 'http://127.0.0.1:5500/images/robot.jpg';

chatBtn.addEventListener("click", function(e){
  chatBox.style.display = 'block';
  this.style.display = 'none';
});

minimiseBtn.addEventListener("click", function(e){
  chatBtn.style.display = 'flex';
  chatBox.style.display = 'none';
});

chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  writeResponse(data.message, recieverClass, robotImage)
}

chatSocket.onclose = function(e) {
  writeResponse('Connection closed', recieverClass, robotImage)
};

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
  document.querySelector('#message-container').appendChild(paragraph);
  document.querySelector('#message-container').scrollTop = messageContainer.scrollHeight;
}

/**
 * Check if socket connected or not
 */
function checkConnection(){
  if (chatSocket !== null && WebSocket.OPEN) {
    writeResponse('Welcome User', recieverClass, robotImage)
  }
}

/**
 * Sends the chatMessage.
 */
 function sendChatMessage() {
  const message = messageInputDom.value;
    if (message !== '') {
      writeResponse(message, senderClass, userImage)
      chatSocket.send(JSON.stringify({
        'message': message,
        'username': 'John Doe',
        'cookie':'csrftoken=ilAWWPS8AadZJxHoBnFm0G4JrggSkSWtv5o5rOxw1O6Drsw6yJq2ws6i0677VG21; sessionid=f3rsovk802vkg356vnxwye4lvkpgk0cz'
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

  window.addEventListener("load", (event) => {
    checkConnection();
  });