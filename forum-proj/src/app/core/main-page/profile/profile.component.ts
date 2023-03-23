import {Component, Input} from '@angular/core';
import {Utente} from "../../../variable-type";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: Utente;
}
