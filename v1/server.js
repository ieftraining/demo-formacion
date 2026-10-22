const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8080;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    const content = fs.readFileSync('index.html', 'utf8');
    res.end(content);
}).listen(port);

console.log(`Servidor escuchando en puerto ${port}`);