import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Controller, Utente} from "../../variable-type";

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  control = new Controller(false, false, false, 1);
  @Input() user = new Utente("","","","","",0,"/assets/images/default-user-icon.png");
  @Output() control_ = new EventEmitter<Controller>();
  @Output() user_ = new EventEmitter<Utente>();
  @Input() titolo: string = "";
  @Input() sottotitolo: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  setPage(value: number) {
    this.control.pagectrl = value;
    this.control_.emit(this.control);
  }
}
