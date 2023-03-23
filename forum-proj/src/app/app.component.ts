import { Component } from '@angular/core';
import {Controller, Utente} from "./variable-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forum-proj';
  titolo: string = "Welcome user!";
  sottotitolo: string = "--Log in for full access--";
  user = new Utente("","","","","",1,"/assets/images/default-user-icon.png");
  control = new Controller(false, false, false, 1);

  ControllerIN(value: Controller){
    this.control = value;
    if(!this.control.autenticato){
      this.user.username = "";
      this.user.nome = "";
      this.user.cognome = "";
      this.user.sesso = "";
      this.user.eta = 0;
      this.user.image = "/assets/images/default-user-icon.png";
    }
    this.setTitles();
  }

  UserController(value: Utente) {
    this.user = value;
    this.setTitles();
  }

  setTitles(){
    if(!this.control.autenticato){
      this.sottotitolo = "--Log in for full access--";
      this.titolo = "Welcome user!";
    }else{
      this.sottotitolo = "";
      this.titolo = "Welcome " + this.user.nome + "!";
    }
  }
}

