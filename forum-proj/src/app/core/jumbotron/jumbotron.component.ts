import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() titolo: string = "";
  @Input() sottotitolo: string = "";
  @Input() Show: boolean = true;
  @Input() autenticato: boolean | null = false;

  constructor() { }

  ngOnInit(): void {
  }

}
