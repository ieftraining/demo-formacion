const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8080;

// Simulación de arranque lento
let ready = false;

console.log('Iniciando aplicación...');

setTimeout(() => {
    ready = true;
    console.log('Aplicación preparada para recibir tráfico');
}, 30000);

http.createServer((req, res) => {

    // Endpoint de versión
    if (req.url === '/version') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify({
            version: 'v3'
        }));
    }

    // Endpoint de liveness
    if (req.url === '/live') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        return res.end('OK');
    }

    // Endpoint de readiness
    if (req.url === '/ready') {

        if (!ready) {
            res.writeHead(503, {
                'Content-Type': 'text/plain'
            });

            return res.end('NOT READY');
        }

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        return res.end('READY');
    }

    // Página principal
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    const content = fs.readFileSync('index.html', 'utf8');
    res.end(content);

}).listen(port);

console.log(`Servidor escuchando en puerto ${port}`);