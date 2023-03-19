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
