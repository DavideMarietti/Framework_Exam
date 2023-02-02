const express = require('express');

const userfile = require('./js/user-file');

const port = 3000;
const app = express();
const router = express.Router();

const {createApp} = require("./js/load-data");

const appLogic = createApp();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.route("/user")
    .get((req, res) => {
        if (req.query.id !== undefined && userfile.userExists(req.query.id)) {
            userfile.sendFile(req.query.id, res);
        } else {
            res.sendStatus(404);
        }
    })
    .post((req, res) => {
        userfile.writeUserData(req.body);
        res.sendStatus(200);
    });

router.route("/:username")
    .get((req, res) => {
        const name = req.params.username;
        const isuser = (name.length > 0 && appLogic.users.hasOwnProperty(name));
        if (isuser) {
            res.send(appLogic.getUserPlants(name));
        } else {
            res.sendStatus(404);
        }
    });

app.use("/", router);

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});