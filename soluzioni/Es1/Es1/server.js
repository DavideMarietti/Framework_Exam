const http = require('http');
const data = require('./loaddata.js');

const hostname = "127.0.0.1";
const port = 8713;

const app = data.createApp();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let username = "";
    if (req.url === "/matteo") {
        username = "matteo";
    } else if (req.url === "/alice") {
        username = "alice";
    } else if (req.url === "/celia") {
        username = "celia";
    }

    if (username.length > 0 && app.utenti[username] !== undefined) {
        const tosend = app.utenti[username]
            .collezioneAttuale
            .map(elem => elem.collezionabile);
        res.end(JSON.stringify(tosend));
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>utente inesistente</h1>");
    }
});

server.listen(port, hostname, () => {
    console.log("Server running at http://" + hostname + ":" + port);
});