import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {timeout} from "rxjs";
import {Utente} from "../variable-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  utenteforum = new Utente("Andrea72","pupopeligroso95","Andrea","Rocio","Uomo", 31,"/assets/images/user.png");

  user: string = "";
  psw: string = "";
  errore: boolean = false;
  valido: boolean = false;
  @Output() auth_out = new EventEmitter<boolean>();
  @Output() auth_in = new EventEmitter<boolean>();
  @Output() user_data = new EventEmitter<Utente>();

  img: string = "/assets/images/default-user-icon.png";

  constructor() {
  }

  ngOnInit(): void {
  }

  login = () : void => {
    if (this.user === this.utenteforum.username && this.psw === this.utenteforum.password) {
      this.valido = true;
      setTimeout(() => {
        this.auth_out.emit(true);
        this.auth_in.emit(false);
        this.errore = false;
        this.user_data.emit(this.utenteforum);
      },2000)
    }
    else {
      this.errore = true;
    }
  }

  close_login_form() {
    this.auth_in.emit(false);
  }
}
