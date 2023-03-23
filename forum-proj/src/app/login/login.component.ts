import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {timeout} from "rxjs";
import {Controller, Utente} from "../variable-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  /*utenteforum = new Utente("Andrea72","pupopeligroso95","Andrea","Rocio","Uomo", 31,"/assets/images/user.png");
*/
  @Input() control: Controller;
  user = new Utente("Andrea72","aaa","Andrea","Rocio","Uomo", 31,"/assets/images/user.png");
  @Output() control_ = new EventEmitter<Controller>();
  @Output() user_ = new EventEmitter<Utente>();

  username: string = "";
  password: string = "";
  errore: boolean = false;
  valido: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  login = () : void => {
    if (this.username === this.user.username && this.password === this.user.password) {
      this.valido = true;
      setTimeout(() => {
        this.control.autenticato = true;
        this.control.loginform = false;
        this.control_.emit(this.control)
        this.errore = false;
        this.user_.emit(this.user);
      },1000)
    } else {
      this.errore = true;
    }
  }

  close_login_form() {
    this.control.loginform = false;
    this.control_.emit(this.control);
  }
}
