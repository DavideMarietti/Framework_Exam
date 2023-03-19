import { Component } from '@angular/core';
import {readBooleanType, readStringType} from "@angular/compiler-cli/src/ngtsc/metadata/src/util";
import {Utente} from "./variable-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forum-proj';
  titolo: string = "Welcome user!";
  sottotitolo: string = "--Log in for full access--";
  utenteforum = new Utente("","","","","",0,"/assets/images/default-user-icon.png");
  autenticato: boolean | null = false;
  autenticazione: boolean | null = false;

  receiveAuth(value: boolean) {
      this.autenticato = value;
      this.setTitles();
      if(!this.autenticato){
        this.autenticazione = false;
        this.utenteforum.username = "";
        this.utenteforum.nome = "";
        this.utenteforum.cognome = "";
        this.utenteforum.sesso = "";
        this.utenteforum.eta = 0;
        this.utenteforum.image = "/assets/images/default-user-icon.png"
      }
  }

  receiveAuth_(value: boolean) {
    this.autenticazione = value;
  }

  receiveUser(value: Utente) {
    this.utenteforum = value;
    this.setTitles();
  }

  setTitles(){
    if(!this.autenticato){
      this.sottotitolo = "--Log in for full access--";
      this.titolo = "Welcome user!";
    }else{
      this.sottotitolo = "";
      this.titolo = "Welcome " + this.utenteforum.nome + "!";
    }
  }
}

