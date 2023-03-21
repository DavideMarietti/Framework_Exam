export class Utente {
  public username : string;
  public password: string;
  public nome : string;
  public cognome : string;
  public sesso : string;
  public eta : number;
  public image: string;
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

export class Comment {
  testo: string;
  autore: string;
  parentID: number;
  id: number;
  like: number;
  dislike: number;
  num: number = 0;

  constructor(testo: string, autore: string, parentID: number, like: number, dislike: number) {
    this.testo = testo;
    this.autore = autore;
    this.parentID = parentID;
    this.id = this.num;
    this.num++;
    this.like = like;
    this.dislike = dislike;
  }
}

export class Thread extends Comment{
  title: string;

  constructor(title: string,testo: string, autore: string, parentID: number, like: number, dislike: number) {
    super(testo, autore, parentID, like, dislike);
    this.title = title;
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
