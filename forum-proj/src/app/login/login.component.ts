import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";
  autenticato: boolean = false;
  autenticazione: boolean = false;
  consentito: boolean = false;
  @Output() auth = new EventEmitter<boolean>();
  @Output() auth_ = new EventEmitter<boolean>();
  @Output() userN = new EventEmitter<string>();
  errMsg: string = "Spiacente, userID o psw errati!!!";
  okMsg: string = "Accesso effettuato con successo!!";

  constructor() {
  }

  ngOnInit(): void {
  }

  gestAuth = () : void => {
    console.log(this.username);
    if (this.username === "Andrea" && this.password === "pupopeligroso95") {
      this.autenticato = true;
      this.consentito = true;
      this.autenticazione = false;
    }
    else {
      this.autenticato = false;
      this.consentito = false;
      this.autenticazione = true;
    }
    this.auth.emit(this.autenticato);
    this.auth_.emit(this.autenticazione);
    this.userN.emit(this.username);
  }
}
