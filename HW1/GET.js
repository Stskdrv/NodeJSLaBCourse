const http = require("http");

const options = {
  path: "/",
  method: "GET",
};

const request = http.request("http://localhost:8080/", options, response => {
  let str = "";

  response.on("data", d => {
    str += d;
  });

  response.on("end", () => {
    console.log(str);
  })
});

request.end();