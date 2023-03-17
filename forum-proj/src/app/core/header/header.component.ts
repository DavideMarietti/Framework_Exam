import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() Autenticato: boolean | null = false;
  @Output() auth = new EventEmitter<boolean>();
  @Output() auth_ = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  logout = () : void => {
    this.Autenticato = false;
    this.auth.emit(this.Autenticato);
  }

  login = () : void => {
    this.auth_.emit(true);
  }
}

