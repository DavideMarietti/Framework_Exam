import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utente} from "../../variable-type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() autenticato: boolean | null = false;
  @Input() utenteforum: Utente = new Utente("","","","","",0,"/assets/images/default-user-icon.png");
  @Output() auth_out = new EventEmitter<boolean>();
  @Output() auth_in = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  logout = () : void => {
    this.auth_out.emit(false);
  }

  login = () : void => {
    this.auth_in.emit(true);
  }
}

