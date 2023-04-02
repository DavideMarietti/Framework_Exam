import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {lastValueFrom, Subscription, timeout} from "rxjs";
import {Controller, Utente} from "../variable-type";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Input() control: Controller;

  users: Utente[] = [];
  isFetching = false;
  errorFetching = null;
  private errorSub: Subscription;

  @Output() control_ = new EventEmitter<Controller>();
  @Output() user_ = new EventEmitter<Utente>();

  username: string = "";
  password: string = "";
  errore: boolean = false;
  valido: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService) {}

  ngOnInit() {
    /*    for(let aa of users_sample){
      this.users.push(aa);
    }     */

    this.errorSub = this.loginService.error.subscribe(errorMessage => {
      // @ts-ignore
      this.errorFetching = errorMessage;
    });

    this.isFetching = true;
    lastValueFrom(this.loginService.fetchUsers()).then(
      users => {
        this.isFetching = false;
        this.users = users;
      }).catch(error => {
      this.isFetching = false;
      this.errorFetching = error.message;
    });
  }

  login = () : void => {
    this.errore = false;
    console.log("users: ", this.users);
    let test: boolean = false;
    for (let user in this.users){
      if (this.username === this.users[user].username && this.password === this.users[user].password) {
        this.valido = true;
        test = true;
        setTimeout(() => {
          this.control.autenticato = true;
          this.control.loginform = false;
          this.control_.emit(this.control)
          //this.errore = false;
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

  onHandleError() {
    this.errorFetching = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
