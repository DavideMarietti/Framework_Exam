import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  nome: string = '';
  cognome: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor () {}

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

}

