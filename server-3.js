const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.method === "POST") {

        console.log(req.headers['content-type']);

        // Prendo tutto ciò che c'è nella req e lo dirotto sulla console del terminale
        req.pipe(process.stdout); // output stream della console

        const myfile = fs.createWriteStream("request.json")
        req.pipe(myfile)

        res.end();
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});