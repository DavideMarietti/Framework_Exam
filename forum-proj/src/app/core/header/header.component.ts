import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Controller, Utente} from "../../variable-type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() control = new Controller(false, false, false, 1)
  @Input() user = new Utente("","","","","",0,"/assets/images/default-user-icon.png");
  @Output() control_ = new EventEmitter<Controller>();
  @Output() user_ = new EventEmitter<Utente>();

  constructor() { }

  ngOnInit(): void {
  }

  logout = () : void => {
    this.control.autenticato = false;
    this.control_.emit(this.control);
  }

  loginopen = () : void => {
    this.control.loginform = true;
    this.control_.emit(this.control);
  }

  setPage(value: number) {
    this.control.pagectrl = value;
    this.control_.emit(this.control);
  }
}

