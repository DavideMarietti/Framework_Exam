import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Controller, Utente} from "../../variable-type";

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css']
})
export class RightNavComponent {
  @Input() control: Controller;
  @Output() control_ = new EventEmitter<Controller>();
  @Output() searchword_ = new EventEmitter<string>();

  search: string = "";

  insertnewTD(){
    this.control.newthread = !this.control.newthread;
  }

  sendword(){
    this.searchword_.emit(this.search);
  }

}
