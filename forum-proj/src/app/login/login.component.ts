import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userId: string = "Andrea";
  password: string = "";
  autenticato: boolean = true;
  consentito: boolean = true;
  errMsg: string = "Spiacente, userID o psw errati!!!";
  okMsg: string = "Accesso effettuato con successo!!";

  titolo: string = "Welcome " + this.userId + "!";
  /*sottotitolo: string = this.userId + "!";*/

  constructor() {
  }

  ngOnInit(): void {
  }

  gestAuth = () : void => {
    console.log(this.userId);
    if (this.userId === "Andrea" && this.password === "pupopeligroso95") {
      this.autenticato = true;
      this.consentito = true;
    }
    else {
      this.autenticato = false;
      this.consentito = false;
    }
  }
}
