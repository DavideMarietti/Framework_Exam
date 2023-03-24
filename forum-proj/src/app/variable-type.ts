export class Utente {
  username : string;
  password: string;
  nome : string;
  cognome : string;
  sesso : string;
  eta : number;
  image: string;

  constructor(username: string, password: string, nome: string, cognome: string, sesso: string, eta: number, image: string) {
    this.username = username;
    this.password = password;
    this.nome = nome;
    this.cognome = cognome;
    this.sesso = sesso;
    this.eta = eta;
    this.image = image;
  }
}

export class Comment{
  testo: string;
  autore: string;
  id: number;
  like: number;
  dislike: number;
  view?: boolean;
  parentID: number;

  constructor(id: number,testo: string, autore: string, parentID: number, like: number, dislike: number) {
    this.testo = testo;
    this.autore = autore;
    this.id = id;
    this.like = like;
    this.dislike = dislike;
    this.view = false;
    this.parentID = parentID;
  }
}

export class Thread{
  testo: string;
  autore: string;
  id: number;
  like: number;
  dislike: number;
  view?: boolean;
  titolo: string;
  expand?: boolean;

  constructor(id: number,title: string,testo: string, autore: string, like: number, dislike: number) {
    this.testo = testo;
    this.autore = autore;
    this.id = id;
    this.like = like;
    this.dislike = dislike;
    this.view = true;
    this.titolo = title;
    this.expand = false;
  }
}

export class Controller {
  autenticato: boolean;
  loginform: boolean;
  registform: boolean;
  pagectrl: number;

  constructor(autenticato: boolean, loginform: boolean, registform: boolean, pagectrl: number) {
    this.autenticato = autenticato;
    this.loginform = loginform;
    this.registform = registform;
    this.pagectrl = pagectrl;
  }
}
