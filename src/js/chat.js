'use strict'

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode ===13) {
        send()
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
};

sendButton.addEventListener('click',send) 



socket.on("chatting", (data) => {
    const {name, msg, time} = data;
    const item = new liModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function liModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "recevied")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="./js/p_img.png" alt="any" width="50" height="50">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    }
}