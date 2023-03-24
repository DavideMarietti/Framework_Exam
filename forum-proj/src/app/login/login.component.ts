import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {timeout} from "rxjs";
import {Controller, Utente} from "../variable-type";
import users_sample from "../users_sample.json"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Input() control: Controller;

  users: Utente[] = [];

  @Output() control_ = new EventEmitter<Controller>();
  @Output() user_ = new EventEmitter<Utente>();

  username: string = "";
  password: string = "";
  errore: boolean = false;
  valido: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    for(let aa of users_sample){
      this.users.push(aa);
    }
  }

  login = () : void => {
    let test: boolean = false;
    for (let user in this.users){
      if (this.username === this.users[user].username && this.password === this.users[user].password) {
        this.valido = true;
        test = true;
        setTimeout(() => {
          this.control.autenticato = true;
          this.control.loginform = false;
          this.control_.emit(this.control)
          this.errore = false;
          this.user_.emit(this.users[user]);
        },2000)
      }
    }
    if(!test){
      this.errore = true;
    }
  }

  close_login_form() {
    this.control.loginform = false;
    this.control_.emit(this.control);
  }

  /*initPlants() {

    const res = await fetch("../data/plants.json");
    const users = await res.json();

    try {
      for (let user of users) {
        user
      }
    } catch (err) {
    }
  }*/
}
