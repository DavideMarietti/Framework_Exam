exports.Partecipante = class Partecipante {

    static count = 0;

    static assegnaId() {
        const id = this.count;
        this.count++;
        return id;
    }

    constructor(nome, cognome) {
        this._identificatore = Partecipante.assegnaId();
        this.nome = nome;
        this.cognome = cognome;
        this._collezione = [];
    }

    get identificatore() {
        return this._identificatore;
    }


    get collezioneAttuale() {
        return this._collezione.map(x => x);
    }

    get collezioneInPrestito() {
        return this._collezione.filter(elem => (elem.proprietario !== this));
    }
}

exports.Collezionabile = class Collezionabile {
    static count = 0;
    static tutti = [];

    static assegnaId() {
        const id = this.count;
        this.count++;
        return id;
    }

    static ottieni(id) {
        return this.tutti[id];
    }

    constructor(nome, descrizione) {
        this.identificatore = Collezionabile.assegnaId();
        Collezionabile.tutti[this.identificatore] = this;
        this.nome = nome;
        this.descrizione = descrizione;
    }
}

exports.ElementoCollezione = class ElementoCollezione {
    constructor(collezionabile, proprietario, prestabile = true) {
        this._collezionabile = collezionabile;
        this._proprietario = proprietario;
        this._prestabile = prestabile;
        this._destinatario = null;
    }

    get collezionabile() {
        return this._collezionabile;
    }

    get proprietario() {
        return this._proprietario;
    }

    get prestabile() {
        return this._prestabile;
    }

    get inPrestito() {
        return this._destinatario !== null;
    }

    get possessore() {
        return (this._destinatario === null ? this.proprietario : this._destinatario);
    }

    set possessore(partecipante) {
        if (partecipante === this._proprietario) {
            this._destinatario = null;
        } else {
            if (this._destinatario === null && this._prestabile) {
                this._destinatario = partecipante;
            }
        }
    }
}

exports.Collezionista = class Collezionista extends exports.Partecipante {

    constructor(nome, cognome) {
        super(nome, cognome)
    }

    colleziona(collezionabile) {
        const elem = new exports.ElementoCollezione(collezionabile, this);
        this._collezione.push(elem);
    }

    rimuovi(collezionabile) {
        let pos = -1;
        for (let i=0; i < this._collezione.length && pos < 0; i++) {
            if (elem.collezionabile === collezionabile) {
                pos = i;
            }
        }
        if (pos >= 0) this._collezione.splice(pos, 1);
    }

    presta(collezionabile, partecipante) {
        for (let elem of this._collezione) {
            if (elem.collezionabile === collezionabile && elem.prestabile && !elem.inPrestito) {
                // verifica che l'elemento sia prestabile e NON sia già in prestito
                // quindi lo cede a colui che lo vuole in prestito
                elem.possessore = partecipante;

                // lo inserisce effettivamente nella collezione del destinarario del prestito
                partecipante._collezione.push(elem);
                break;
            }
        }
    }

    riprendi(collezionabile) {
        for (let elem of this._collezione) {
            if (elem.collezionabile === collezionabile && elem.inPrestito) { // verifica che l'elemento sia in prestito
                // toglie l'elemento corrispondente dalla collezione del destinatario del prestito
                const aChiLhoPrestato = elem.attualePossessore();
                const pos = aChiLhoPrestato._collezione.splice(pos, 1);

                // il proprietario diventa anche il possessore
                elem.possessore = this;
                break;
            }
        }
    }

    get collezionePropria() {
        return this._collezione.filter(elem => (elem.proprietario === this));
    }

    get disponibili() {
        return this._collezione.filter(elem => (elem.proprietario === this && elem.prestabile && !elem.inPrestito));
    }

    get prestati() {
        return this._collezione.filter(elem => (elem.proprietario === this && elem.inPrestito));
    }

    get privati() {
        return this._collezione.filter(elem => !elem.prestabile);

    }
}

exports.BranoMusicale = class BranoMusicale extends exports.Collezionabile {
    constructor(nome, descrizione, performer, eplp, lyrics, music, anno) {
        super(nome, descrizione);
        this.lyrics = lyrics;
        this.music = music;
        this.performer = performer;
        this.eporlp = eplp;
        this.anno = anno;
    }

    get title() {
        return this.nome;
    }
}
