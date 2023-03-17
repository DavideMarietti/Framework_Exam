import { Component } from '@angular/core';
import {readBooleanType, readStringType} from "@angular/compiler-cli/src/ngtsc/metadata/src/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forum-proj';
  titolo: string = "Welcome user!";
  sottotitolo: string = "--Log in for full access--";
  username: string | null = "";
  autenticato: boolean | null = false;
  autenticazione: boolean | null = false;

  receiveAuth(value: boolean) {
      this.autenticato = value;
      this.setTitles();
  }

  receiveAuth_(value: boolean) {
    this.autenticazione = value;
  }

  receiveUser(value: string) {
    this.username = value;
    this.setTitles()
  }

  setTitles(){
    if(!this.autenticato){
      this.sottotitolo = "--Log in for full access--";
      this.titolo = "Welcome user!";
    }else{
      this.sottotitolo = "";
      this.titolo = "Welcome " + this.username + "!";
    }
  }
}
