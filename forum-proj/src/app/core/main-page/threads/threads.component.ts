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

  expand(i) {
    this.threads[i].expand = !this.threads[i].expand;
    this.threads.forEach((element, index) => {
      if(i !== index){
        element.expand = false;
      }
    })
  }

  reactionControlUp(i) {
    if(this.control.autenticato){
      this.threads[i].like++;
    }
  }

  reactionControlDown(i) {
    if(this.control.autenticato){
      this.threads[i].dislike++;
    }
  }
}
