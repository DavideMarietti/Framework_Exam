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

export class Post {
  testo: string;
  autore: string;
  id: number;
  like: number;
  dislike: number;
  num: number = 0;
  opencomments: boolean;
  constructor(testo: string, autore: string, like: number, dislike: number) {
    this.testo = testo;
    this.autore = autore;
    this.id = this.num;
    this.num++;
    this.like = like;
    this.dislike = dislike;
    this.opencomments = false;
  }
}

export class Comment extends Post{
  parentID: number;

  constructor(testo: string, autore: string, parentID: number, like: number, dislike: number) {
    super(testo, autore, like, dislike);
    this.parentID = parentID;
  }
}

export class Thread extends Post{
  title: string;
  expandthread: boolean;

  constructor(title: string,testo: string, autore: string, like: number, dislike: number) {
    super(testo, autore, like, dislike);
    this.title = title;
    this.expandthread = false;
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
