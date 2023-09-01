const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type','text/html')
res.write('<html>')
res.write('<head><title>Mtfirst page</title><head>')
res.write('<body><h1>Welcome to my Nodejs project</h1></body>');
res.write('</html>')
res.end();
})
server.listen(4000);