// ДЗ(1.25 - 1 лекция) - поднять локально  сервер на порту 8080, паралельно нужно написать приложение, которое будет посылать GET запрос, POST запрос и GET запрос со спец. заголовком:LoveWillSaveTheWorld
//1-написать нод код который на заданный URL шлет любой GET запрос
//2-написать нод код который на заданный URL шлет любой POST запрос
//3-написать нод код который на заданный URL шлет любой POST запрос c заголовком LoveWillSaveTheWorld.

//1 Поднимаем сервер.

// const https = require('https');//Для начала мы загрузим модуль http, входящий в стандартную комплектацию установки Node.js, там мы находим те функции которые позволят нам создать сервер.
// const port = 8080;// порт который мы будем слушать и к которому обращаться


// const server = http.createServer(())

const http = require("http");

http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(`You sent the following request: ${request.method}\n`);
  response.write(`Request url is: ${request.url}\n`);
  if (request.headers["whatwillsavetheworld"]) {
    response.write(`Request has a header - WhatWillSaveTheWorld: ${request.headers["whatwillsavetheworld"]}`);
  }
  response.end();
}).listen(8081, console.log("Server listening at port 8081"));