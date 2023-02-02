const express = require('express');
const session = require('express-session');
const userfile = require('./js/user-file');

const {createApp} = require("./js/load-data");

const appLogic = createApp();

const port = 3000;
const app = express();
const router = express.Router();

app.use(session({
    secret: "pincopallinoecappuccettorosso",
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.route("/user")
    .get((req, res) => {
        console.log(req.session)

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

router.route("/login/:username")
    .get((req, res) => {
        const name = req.params.username;
        const isuser = (name.length > 0
            && appLogic.users.hasOwnProperty(name));
        if (isuser) {
            req.session.username = name;
            res.send("<h3>Login successful</h3>");
        } else {
            res.sendStatus(404);
        }
    });

router.route("/logout")
    .get((req, res) => {
        if (req.session.username !== undefined) {
            req.session.destroy();
            res.send("<h3>Logout successful</h3>");
        } else {
            res.send("<h3>No logged users</h3>");
        }
    });

router.route("/collection")
    .get((req, res) => {
        console.log(req.session);
        if (req.session.username !== undefined) {
            const name = req.session.username;
            const isuser = (name.length > 0 && appLogic.users.hasOwnProperty(name));
            if (isuser) {
                res.send(appLogic.getUserPlants(name));
            } else {
                res.sendStatus(404);
            }
        } else {
            res.send("<h3>No logged users</h3>");
        }
    });

app.use("/", router);

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});