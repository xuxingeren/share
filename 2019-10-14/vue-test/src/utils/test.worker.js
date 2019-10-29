import SockJS from 'sockjs-client';
import Stomp from "stompjs";

// const socket = new WebSocket("ws://localhost:8084/websocket");
var socket = new SockJS('http://localhost:8084/websocket');
let stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
    stompClient.subscribe("/aaa", (msg) => {
        consolel.log(msg.body);
    })
}, (err) => {
    // 连接发生错误时的处理函数
    console.log(err);
});
addEventListener('message', function(event) {
    this.console.log(11111111)
    stompClient.send("/aaa", {}, event.data.text)
}, false);
// sock.addEventListener('open', function(event) {
//     sock.send('Link Socket!');
// });
// sock.addEventListener('message', function(event) {
//     postMessage(event.data);
// });