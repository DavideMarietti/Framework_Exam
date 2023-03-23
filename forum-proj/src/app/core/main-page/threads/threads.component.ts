import {Component, Input} from '@angular/core';
import {Comment, Controller, Thread, Utente} from "../../../variable-type";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import users_sample from "../../../users_sample.json";
import threads_sample from "../../../threads_sample.json";
import comments_sample from "../../../comments_sample.json";
import {findIndex} from "rxjs";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent {
  @Input() user: Utente;
  @Input() control: Controller;

  @Input('ngModel')model: number;

  threads: Thread[] = [];
  comments: Comment[] = [];

  ngOnInit(): void{
    for(let aa of threads_sample){
      this.threads.push(aa);
    }
    for(let aa of comments_sample){
      this.comments.push(aa);
    }
  }

  expand() {
    const index = this.threads.findIndex(aa => aa.id === this.model);
    this.threads[index].expand = !this.threads[index].expand;
  }

  /*expand_comments() {
    this.model.view = !this.model.view;
    this.threadControl(this.model);
  }*/

  reactionControlUp() {
    if(this.control.autenticato){
      const index = this.threads.findIndex(aa => aa.id === this.model);
      this.threads[index].like++;
    }
  }

  reactionControlDown() {
    if(this.control.autenticato){
      const index = this.threads.findIndex(aa => aa.id === this.model);
      this.threads[index].dislike++;
    }
  }

  identify(index, thread){
    return thread;
  }
}
