const http = require('http');

const server = http.createServer((req,res) => {
    console.log(req);
});
server.Listen(4000);