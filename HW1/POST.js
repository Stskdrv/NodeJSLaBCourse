const http = require("http");

const options = {
  path: "/post",
  method: "POST",
  headers: { WhatWillSaveTheWorld: "Love" },
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