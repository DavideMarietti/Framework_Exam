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

  titolo: string;
  testo: string;
  testo_: string;
  testo__: string;

  ngOnInit(): void{
    this.load_data();
    this.comment_counter();
    this.hierarchy_analyzer();
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
        element.view = !this.threads[i].expand;
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
      if(!threadcheck && !reactiontype){ this.comments[i].dislike++; }
    }
  }

  expand_comments(i, threadcheck: boolean) {
    if(threadcheck){
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
          this.comments.forEach((elem, ind) => {
            if(elem.level === element.level-1 && elem.parentID === this.comments[i].parentID && elem.id !== this.comments[i].id){
              elem.view = !element.view;
            }
            if(elem.level > element.level && !element.view){
              elem.view = false;
            }
          });
        }
      });
    }
  }

  answer_form(i, threadcheck: boolean){
    if(threadcheck){
      this.threads[i].answer = !this.threads[i].answer;
    }else{
      this.comments[i].answer = !this.comments[i].answer;
    }
  }

  hierarchy_analyzer() {
    this.comments.forEach((element, index) => {
      this.threads.forEach((elem, ind) => {
        if(element.parentID === elem.id){
          element.level = 1;
        }
      });
      this.comments.forEach((elem, ind) => {
        if(element.parentID === elem.id){
          element.level = elem.level + 1;
        }
      });
    });
  }

  comment_counter(){
    this.threads.forEach((elem, ind) => {elem.commcounter = 0;});
    this.comments.forEach((elem, ind) => {elem.commcounter = 0;});
    this.comments.reverse().forEach((element, index) => {
      this.threads.forEach((elem, ind) => {
        if(elem.id === element.parentID){
          elem.commcounter = elem.commcounter + 1 + element.commcounter;
        }
      });
      this.comments.forEach((elem, ind) => {
        if(elem.id === element.parentID){
          elem.commcounter = elem.commcounter + 1 + element.commcounter;
        }
      });
    });
    this.comments.reverse();
  }

  addThread(){
    let newTD = new Thread(this.genID(), this.titolo, this.testo, this.user.username, 0, 0, 0);
    this.threads.push(newTD);
    this.control.newthread = false;
  }

  addComment(i, threadcheck: boolean){
    let txt: string = "";
    let parentIDvalue: number = 0;
    let Levelvalue: number = 0;
    if(threadcheck){
      parentIDvalue = this.threads[i].id;
      Levelvalue = 1;
      txt = this.testo_;
      this.testo_ = "";
      this.threads[i].answer = false;
    }else{
      parentIDvalue = this.comments[i].id;
      Levelvalue = this.comments[i].level + 1;
      txt = this.testo__;
      this.testo__ = "";
      this.comments[i].answer = false;
    }
    let tempID: number = this.genID();
    let newCM = new Comment(tempID, txt, this.user.username, parentIDvalue, 0, 0, 0, Levelvalue);
    this.comments.push(newCM);
    if(threadcheck){
      this.comments.forEach((element, index) => {
        if(element.level >= 1){
          element.view = false;
        }
      });
    }else{
      this.comments.forEach((element, index) => {
        if(element.level > this.comments[i].level){
          element.view = false;
        }
      });
    }
    this.expand_comments(i, threadcheck);
    this.comment_counter();

  }


  genID() {
    let count: number = 0;
    this.threads.forEach((element, index) => {
      if(element.id >= count) {
        count = element.id + 1;
      }
    });
    this.comments.forEach((element, index) => {
      if(element.id >= count) {
        count = element.id + 1;
      }
    });
    return count;
  }
}
