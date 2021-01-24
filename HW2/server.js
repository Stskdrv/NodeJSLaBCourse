// Мы достаем модуль FS из ноды, чтобы дальше  сним работать, это объект файловой системы
// Sync означает, что мы будем работать синхронно, тоесть блокируем поток исполнения пока чтение не закончится.FS
const http = require('http');
const fs = require('fs');//Мы достаем модуль FS из ноды, чтобы дальше  сним работать, это объект файловая система
const port = 8080;
const db = 'names_ip.json';

let users = [];

// if (fs.existsSync(db)) {//Sync означает, что мы будем работать синхронно, тоесть блокируем поток исполнения пока проверяем наличие файлв ДБ
//     users = JSON.parse(fs.readFileSync(db, 'utf-8'));//Sync означает, что мы будем работать синхронно, тоесть блокируем поток исполнения пока чтение файла не закончится. Это ключевой конфигурационный файл, поэтому мы блокирум выполнение кода
//     for (let user of users) {
//         console.log(`Hi, ${user.name}, you IP is ${user.ip}`);
//     }
// }
// // по существу, мы создаем state, состояние у сервера, которое будет храниться после того как его остановят и к которому можно обратиться и прочитать его
// http
//     .createServer(function (request, response) {// создаем сервер
//         const queryObject = url.parse(request.url, true).query;// парсим ЮРЛ
//         response.writeHead(200, {'Content-Type': 'text/plain'});// передаем туда настройку что будем отвечать текстом

//         if (queryObject.name) {//если в спаршенном объекте нашелся нэйм, то мы туда пушим наше переданное имя
//             names.push(queryObject.name);
//             fs.writeFile(dbName, JSON.stringify(names), err => {// тут мы уже записываем имена асинхронно, так как у нас один сервер и одновременно в него могут залетать много разных запросов
//                 if (err) {
//                     throw err;
//                 }
//             })
//         }
//         response.end(`hi, ${names.join(',')}, little bastard!`)
//     })
//     .listen(port);

// // Сервер будет здороваться с нами, только если закинуть пост запрос с секретным заголовком.

const requestHandler = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    if (request.method === 'POST') {
        if (request.headers.iknowyoursecret === 'TheOwlAreNotWhatTheySeem') {
            if (request.headers.name) {
                users.push({name: request.headers.name, ip: request.connection.remoteAddress})
                fs.writeFile(db, JSON.stringify(users, null, ' '), err => {
                    if (err) {
                        throw err;
                    }
                });
            }
        } else {
            console.log('Tell me the secret');
        }
    }
    response.end();
}

const server = http.createServer(requestHandler);

server.listen(port, error => {
    if (error) {
        console.log(`And error has occurred: ${error}`);
    } else {
        console.log(`Server is listening on ${port}`);
    }
});