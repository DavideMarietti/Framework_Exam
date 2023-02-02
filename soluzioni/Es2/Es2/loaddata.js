const model = require("./collezioni-model.js");

function loadUsers(app) {
    const users = [{
        nomeUtente: "Alice",
        cognomeUtente: "Corvetto",
        collezionista: true,
        braniUtente: ["eightdays", "ship2wreck", "thankU", "cityofangels"]
    }, {
        nomeUtente: "Matteo",
        cognomeUtente: "De Angeli",
        collezionista: true,
        braniUtente: ["labyrinth", "cicale", "alghero"]
    }, {
        nomeUtente: "Celia",
        cognomeUtente: "Gioia",
        collezionista: false
    }];
    for (let u of users) {
        if (u.collezionista)
            app.utenti[u.nomeUtente.toLowerCase()] = new model.Collezionista(u.nomeUtente, u.cognomeUtente);
        else app.utenti[u.nomeUtente.toLowerCase()] = new model.Partecipante(u.nomeUtente, u.cognomeUtente);
        if (u.collezionista) {
            for (let b of u.braniUtente) {
                app.utenti[u.nomeUtente.toLowerCase()].colleziona(app.brani[b]);
            }
        }
    }

}

function loadBrani(app) {
    app.brani["eightdays"] = new model.BranoMusicale("Eight Days a Week", `Ooh, I need your love, babe
Guess you know it's true
Hope you need my love, babe
Just like I need you`, "The Beatles", "Beatles for Sale",
        "Lennon-McCartney", "Lennon-McCartney", 1964);
    app.brani["ship2wreck"] = new model.BranoMusicale("Ship to Wreck", `And, ah, my love remind me, what was it that I said?
I can't help but pull the earth around me to make my bed
And, ah, my love remind me, what was it that I did?
Did I drink too much? Am I losing touch?
Did I build a ship to wreck?`, "Florence and the Machine",
        "How Big, How Blue, How Beautiful", "Florence Welch, Tom Hull", "Florence Welch, Tom Hull", 2015);
    app.brani["thankU"] = new model.BranoMusicale("Thank U", `How 'bout no longer being masochistic?
How 'bout remembering your divinity?
How 'bout unabashedly bawling your eyes out?
How 'bout not equating death with stopping?`, "Alanis Morissette", "Supposed Former Infatuation Junkie",
        "Alanis Morissette, Glen Ballard", "Alanis Morissette, Glen Ballard", 1998);
    app.brani["cityofangels"] = new model.BranoMusicale("City of Angels", `Lost in the city of angels
Down in the comfort of strangers
I found myself in the far burned hills
In the land of a billion lights`, "Thirty Seconds to Mars",
        "Love, Lust, Faith and Dreams", "Jared Leto", "Jared Leto", 2013);
    app.brani["labyrinth"] = new model.BranoMusicale("Labyrinth", `I find my only salvation
In playing hide and seek in this labyrinth
And my sense of connection
Is lost like the sound of my steps`, "Elisa", "Pipes & Flowers",
        "Catherine Marie Warner, Elisa Toffoli", "Catherine Marie Warner, Elisa Toffoli", 1997);

    app.brani["cicale"] = new model.BranoMusicale("Cicale", `Di chi sta male
Cicale, cicale, cicale
Di chi fa il pianto
Cicale ma mica poi tanto`, "Heather Parisi", "Cicale/Mr.Pulce",
        "Alberto Testa, Tony De Vita, Silvio Testi, Franco Miseria e Antonio Ricci",
        "Alberto Testa, Tony De Vita, Silvio Testi, Franco Miseria e Antonio Ricci", 1981);

    app.brani["alghero"] = new model.BranoMusicale("Alghero", `Musica, è come musica
Il desiderio regna nella mente
E parto senza voglia di tornare
Musica, è come musica
La smania che mi prende di vestirmi da sirena
È come una visione magica`, "Giuni Russo", "Giuni", "Giuni Russo",
        "Maria Antonietta Sisini", 1986);
}

function simulaPrestiti(app) {
    app.utenti["alice"].presta(app.brani["eightdays"], app.utenti["matteo"]);
    app.utenti["alice"].presta(app.brani["ship2wreck"], app.utenti["celia"]);

    app.utenti["matteo"].presta(app.brani["cicale"], app.utenti["celia"]);
    app.utenti["matteo"].presta(app.brani["labyrinth"], app.utenti["alice"]);
}


function createApp() {
    const app = {
        utenti: {},
        brani: {}
    }
    loadBrani(app);
    loadUsers(app);
    simulaPrestiti(app);

    app.ottieniBraniUtente = (username) => {
        return app.utenti[username]
            .collezioneAttuale
            .map(elem => elem.collezionabile);
    }

    return app;
}

module.exports = { createApp };