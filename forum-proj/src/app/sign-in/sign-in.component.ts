import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Controller} from "../variable-type";
import {HttpClient} from "@angular/common/http";
import {SignInService} from "./sign-in.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit{
  @Input() control: Controller;

  nome: string = '';
  cognome: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  @Output() control_ = new EventEmitter<Controller>();


  constructor (private http: HttpClient, private signInService: SignInService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }



    const data = {
      nome: this.nome,
      cognome: this.cognome,
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log(data);
  }

  ngOnInit(): void {
  }

}

