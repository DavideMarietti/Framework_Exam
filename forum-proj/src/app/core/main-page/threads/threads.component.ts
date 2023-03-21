import {Component, Input} from '@angular/core';
import {Comment, Controller, Thread, Utente} from "../../../variable-type";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent {
  @Input() user: Utente;
  @Input() control: Controller;

  /*thread = new Thread()[];
  comment = new Comment()[];

  thread[1] = new Thread("Titolo","Damn bro!!", "autore", 21, 12);
  comment[2] = new Comment("ciao come va", "alice", 1, 2, 1);
  comment[3] = new Comment("sono le 3 passsate PD", "lorenzo", 1, 3, 0);*/

  thread = new Thread("Titolo","Damn bro!!", "autore", 21, 12);
  comment2 = new Comment("ciao come va", "alice", 1, 2, 1);
  comment3 = new Comment("sono le 3 passsate PD", "lorenzo", 1, 3, 0);

  expand() {
    this.thread.expandthread = !this.thread.expandthread;
  }

  expand_comments() {
    this.thread.opencomments = !this.thread.opencomments;
  }
}
