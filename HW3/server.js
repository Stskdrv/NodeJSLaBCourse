// код с урока и теория

// const express = require("express"); // запрашиваем модуль экспресс вместо хттп, он и юрл приходт вместе с экспрессом.
// const fs = require('fs');//Мы достаем модуль FS из ноды, чтобы дальше  сним работать, это объект файловая система
// const port = 8080; 
// const db = 'names_ip.json';

// const app = express();//вызываем экспресс

// let users = [];

// app.use((request,response, next) => { // с помощью метода use мы используем мидлвэр который работает с объектами.
//     if (request.method === "GET") {
//         console.log("WRONG!");
//     } else if (request.method === "POST") {
//         console.log("Allright!");
//     }
//     next();
// })

// app.post("/", (request, response, next) => {// некст означает проброс а следующий уровень мидлвэйра(функции промежуточной обработки, проброс между объектами запроса, ответа и резуьтирующей функции)
//     console.log("hello bastard!");
//     response.end("ok I've done!");


// })

// const requestHandler = (request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     if (request.method === 'POST') {
//         if (request.headers.iknowyoursecret === 'TheOwlAreNotWhatTheySeem') {// мы тут делаем проверку на соответствие нашего заголовка требуемому и если все ок то пушим юзера в базу а если нет то просим его сообщить нам секрет, для доступа
//             if (request.headers.name) {
//                 users.push({name: request.headers.name, ip: request.connection.remoteAddress})
//                 fs.writeFile(db, JSON.stringify(users, null, ' '), err => {
//                     if (err) {
//                         throw err;
//                     }
//                 });
//             }
//         } else {
//             console.log('Tell me the secret');
//         }
//     }
//     response.end();
// }

// const server = http.createServer(requestHandler);

// server.listen(port, error => {
//     if (error) {
//         console.log(`And error has occurred: ${error}`);
//     } else {
//         console.log(`Server is listening on ${port}`);
//     }
// });

////////////////////////////////////////////////////////////////////////////////////////////////

//Перерписываем сервер на экспресс, авторизация по хэдэру и обработка запроса.

const fs = require("fs");
const db = "./visitors.json";
const express = require("express"); // добавляем к нам в проект экспресс
const app = express(); // создаем константу вызывая экспресс

let users = {
    visitors: [],
};

if (fs.existsSync(db)) {// парсим из ДБ если она существует.
    users = JSON.parse(fs.readFileSync(db, "utf-8"));
}

app.use((request, response, next) => {// используем синтаксис экспресса для обработки запросов, тут проверям наш хэдэр
    
    if (request.headers["iknowyoursecret"] !== "TheOwlsAreNotWhatTheySeem") {
        return response.end("You don't know the secret");
    }
    
    next();
});

app.post("/", (request, response, next) => {// создаем пост запрос
    const name = request.query.name;

    if (!name) {
        return response.end("Name not detected");
    }

    const ip = request.ip;

    const visitor = { name, ip };
    users.visitors.push(visitor);

    fs.writeFile(db, JSON.stringify(users), err => {
        if (err) {
            throw err;
        }
    })

    response.send(`Hello, ${users.visitors.map(visitor => visitor.name).join(", ")}!`); //здороваемся со всеми пользователями
    return response.end();
});

app.listen(8082, console.log("Server listening at port 8082"));