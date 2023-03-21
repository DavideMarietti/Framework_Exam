import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Controller, Utente} from "../../variable-type";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @Input() control = new Controller(false, false, false, 1);
  @Input() user = new Utente("","","","","",0,"/assets/images/default-user-icon.png");
  @Output() control_ = new EventEmitter<Controller>();
  @Output() user_ = new EventEmitter<Utente>();
}
