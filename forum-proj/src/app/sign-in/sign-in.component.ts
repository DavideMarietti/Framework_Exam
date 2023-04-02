import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Controller, Utente} from "../variable-type";
import {HttpClient} from "@angular/common/http";
import {SignInService} from "./sign-in.service";
import {lastValueFrom, Subscription} from "rxjs";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit{
  @Input() control: Controller;

  users: Utente[] = [];
  isFetching = false;
  errorFetching = null;
  private errorSub: Subscription;

  @Output() control_ = new EventEmitter<Controller>();

  password_errore: boolean = false;
  username_errore: boolean = false;
  valido: boolean = false;

  nome: string = '';
  cognome: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor (private http: HttpClient, private signInService: SignInService) {}

  ngOnInit() {
    this.errorSub = this.signInService.error.subscribe(errorMessage => {
      // @ts-ignore
      this.errorFetching = errorMessage;
    });

    this.isFetching = true;
    lastValueFrom(this.signInService.fetchUsers()).then(
      users => {
        this.isFetching = false;
        this.users = users;
      }).catch(error => {
      this.isFetching = false;
      this.errorFetching = error.message;
    });
  }

  userRegistration(){
    this.password_errore = false;
    this.username_errore = false;
    const data = {
      username: this.username,
      password: this.password,
      nome: this.nome,
      cognome: this.cognome,
      sesso: "her/her",
      eta: 25
    };
    this.users.forEach((element, index) => {
      if(element.username === this.username){
        this.username_errore = true;
        console.log("utente già esistente");
      }
    });
    if(this.password !== this.confirmPassword && !this.username_errore){
      this.password_errore = true;
    }
    if(!this.password_errore && !this.username_errore){
      lastValueFrom(this.signInService.newUser(data)).then(
        () => {
          this.valido = true;
          console.log("bella lì andata");
          setTimeout(() => {
            this.close_regis_form();
            this.control.loginform = true;
            this.control_.emit(this.control);
          },2000);
        }
      );
    }
  }

  close_regis_form() {
    this.control.registform = false;
    this.control_.emit(this.control);
  }

}

