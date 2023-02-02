const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;

    if (req.url == "/") {

        res.setHeader('Content-Type', 'text/html');

        res.end(`<h1>Home</h1>
                 <p>Home page dell'applicazione</p>`);
    } else if (req.url == "/alice") {
        res.setHeader('Content-Type', 'application/json');

        const data = [
            {item: "Hydrangea"},
            {item: "Cephalotus follicularis"},
            {item: "Anthurium"},
            {item: "Bougainvillea"},
            {item: "Nepenthes Lowii"},
            {item: "Rafflesiaceae"},
            {item: "Caper"},
            {item: "Sansevieria"}
        ];

        const jsonData = JSON.stringify(data)
        res.end(jsonData)
    }
    else if (req.url == "/matteo") {

        res.setHeader('Content-Type', 'application/json');

        const data = [
            {item: "Hibiscus"},
            {item: "Drosera capensis"},
            {item: "Lavandula"},
            {item: "Cactus"},
            {item: "Venus Flytrap"},
            {item: "Pothos"},
            {item: "Orchid"},
            {item: "Philodendron"}
        ];

        const jsonData = JSON.stringify(data)
        res.end(jsonData)
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end(`<h1>Ops! URL non trovato...</h1>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});