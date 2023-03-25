import {Component, Input} from '@angular/core';
import {Comment, Controller, Thread, Utente} from "../../../variable-type";
import threads_sample from "../../../threads_sample.json";
import comments_sample from "../../../comments_sample.json";

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
    this.load_data();
  }

  load_data(){
    for(let aa of threads_sample){
      this.threads.push(aa);
    }
    this.threads.forEach((element, index) => {element.view = true;});
    for(let aa of comments_sample){
      this.comments.push(aa);
    }
  }

  expand_thread(i) {
    this.threads[i].expand = !this.threads[i].expand;
    this.threads.forEach((element, index) => {
      if(i !== index){
        element.expand = false;
      }
    });
    if(!this.threads[i].expand){
      this.comments.forEach((element, index) => {element.view = false;});
    }
  }

  reactionControl(i: any, threadcheck: boolean, reactiontype: boolean) {
    if(this.control.autenticato){
      if(threadcheck && reactiontype){ this.threads[i].like++; }
      if(threadcheck && !reactiontype){ this.threads[i].dislike++; }
      if(!threadcheck && reactiontype){ this.comments[i].like++; }
      if(!threadcheck && !reactiontype){ this.comments[i].like++; }
    }
  }

  expand_comments(i, threadcheck: boolean) {
    if(threadcheck){
      this.threads.forEach((element, index) => {
        if(i !== index){
          element.expand = false;
          element.view = !element.view;
        }
      });
      this.comments.forEach((element, index) => {
        if(element.parentID === this.threads[i].id){
          element.view = !element.view;
        }else{
          element.view = false;
        }
      });
    }else{
      this.comments.forEach((element, index) => {
        if(element.parentID === this.comments[i].id){
          element.view = !element.view;
        }
      });
    }
  }
}
