const http = require('http');
const url = require('url');
const qs = require('querystring');
const data = require('./loaddata.js');
const userfile = require('./userfile.js');

const hostname = "127.0.0.1";
const port = 8713;

const app = data.createApp();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let valid = true;
    let errormsg = "";
    if (req.method === "GET") {
        const name = req.url.substring(1);
        const isuser = (name.length > 0
            && app.utenti.hasOwnProperty(name));

        if (isuser) {
            res.end(JSON.stringify(app.ottieniBraniUtente(name)));
        } else if (req.url.startsWith("/user")) {
            const qpos = req.url.indexOf("?");
            if (qpos < 0) {
                valid = false;
                errormsg = "id utente non specificato";
            } else {
                const u = url.parse(req.url);
                const query = qs.parse(u.query);
                if (query["num"] === undefined ||
                isNaN(query["num"])) {
                    valid = false;
                    errormsg = "id utente non correttamente specificato";
                }
                else {
                    const ucode = parseInt(query["num"]);
                    if (!userfile.userExists(ucode)){
                        valid = false;
                        errormsg = "id utente inesistente";
                    }
                    else {
                        userfile.sendFile(ucode, res);
                    }
                }
            }
        } else {
            valid = false;
            errormsg = "nome utente inesistente";
        }
    } else if (req.method === "POST") {
        if (req.url === "/user"
            && req.headers['content-type'] === "application/json") {
            userfile.createFile(req);
            res.end();
        } else {
            valid = false;
            errormsg = "richiesta non valida";
        }
    }
    if (!valid) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>${errormsg}</h1>`);
    }
});

server.listen(port, hostname, () => {
    console.log("Server running at http://" + hostname + ":" + port);
});