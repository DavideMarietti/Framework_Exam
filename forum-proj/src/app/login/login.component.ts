import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";
  errore: boolean = false;
  @Output() auth_out = new EventEmitter<boolean>();
  @Output() auth_in = new EventEmitter<boolean>();
  @Output() user_data = new EventEmitter<string>();
  @Output() user_img = new EventEmitter<string>();
  errMsg: string = "Attenzione! Username o password errati.";
  okMsg: string = "Accesso effettuato con successo!!";

  img: string = "/assets/images/default-user-icon.png";

  constructor() {
  }

  ngOnInit(): void {
  }

  login = () : void => {
    if (this.username === "Andrea" && this.password === "pupopeligroso95") {
      this.auth_out.emit(true);
      this.auth_in.emit(false);
      this.errore = false;
      this.user_data.emit(this.username);
      this.user_img.emit("/assets/images/user.png");
    }
    else {
      this.errore = true;
    }
  }

  close_login_form() {
    this.auth_in.emit(false);
  }
}
