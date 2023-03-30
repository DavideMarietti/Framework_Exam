import {Component, Input, OnInit, AfterContentInit} from '@angular/core';
import {Comment, Controller, Thread, Utente} from "../../../variable-type";
import {ThreadsService} from "./threads.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit, AfterContentInit {
  @Input() user: Utente;
  @Input() control: Controller;

  threads: Thread[] = [];
  comments: Comment[] = [];

  isFetching = false;
  errorFetching = null;

  private errorSub: Subscription;
  titolo: string;
  testo: string;
  testo_: string;
  testo__: string;

  constructor(private http: HttpClient, private threadService: ThreadsService) {
  }

  ngOnInit(): void {
    this.errorSub = this.threadService.error.subscribe(errorMessage => {
      // @ts-ignore
      this.errorFetching = errorMessage;
    });

    this.isFetching = true;
    this.threadService.fetchThreads().subscribe(
      threads => {
        this.isFetching = false;
        this.threads = threads;
        this.threads.forEach((element, index) => {
          element.view = true;
          element.expand = false;
          element.answer = false;
          console.log("thread : ", element);
        });
      },
      error => {
        this.isFetching = false;
        this.errorFetching = error.message;
      }
    );

    this.isFetching = true;
    this.threadService.fetchComments().subscribe(
      comments => {
        this.isFetching = false;
        this.comments = comments;
        this.comments.forEach((element, index) => {
          element.view = false;
          element.answer = false;
        });
        //console.log("numero thread caricati : ", this.threads.length);
      },
      error => {
        this.isFetching = false;
        this.errorFetching = error.message;
      }
    );
  }



  ngAfterContentInit(): void {
    this.comment_counter();
  }



  expand_thread(i) {
    this.threads[i].expand = !this.threads[i].expand;
    this.threads.forEach((element, index) => {
      if (i !== index) {
        element.expand = false;
        element.view = !this.threads[i].expand;
      }
    });
    if (!this.threads[i].expand) {
      this.comments.forEach((element, index) => {
        element.view = false;
      });
    }
  }

  reactionControl(i: any, threadcheck: boolean, reactiontype: boolean) {
    /*
    if(this.control.autenticato){
      if(threadcheck && reactiontype){ this.threads[i].like++; }
      if(threadcheck && !reactiontype){ this.threads[i].dislike++; }
      if(!threadcheck && reactiontype){ this.comments[i].like++; }
      if(!threadcheck && !reactiontype){ this.comments[i].dislike++; }
    }
     */
  }

  expand_comments(i, threadcheck: boolean) {
    if (threadcheck) {
      this.comments.forEach((element, index) => {
        if (element.parentid === this.threads[i].id) {
          element.view = !element.view;
        } else {
          element.view = false;
        }
      });
    } else {
      this.comments.forEach((element, index) => {
        if (element.parentid === this.comments[i].id) {
          element.view = !element.view;
          this.comments.forEach((elem, ind) => {
            if (elem.level === element.level - 1 && elem.parentid === this.comments[i].parentid && elem.id !== this.comments[i].id) {
              elem.view = !element.view;
            }
            if (elem.level > element.level && !element.view) {
              elem.view = false;
            }
          });
        }
      });
    }
  }

  answer_form(i, threadcheck: boolean) {
    if (threadcheck) {
      this.threads[i].answer = !this.threads[i].answer;
    } else {
      this.comments[i].answer = !this.comments[i].answer;
    }
  }

  /*hierarchy_analyzer() {
    this.comments.forEach((element, index) => {
      this.threads.forEach((elem, ind) => {
        if(element.parentid === elem.id){
          element.level = 1;
        }
      });
      this.comments.forEach((elem, ind) => {
        if(element.parentid === elem.id){
          element.level = elem.level + 1;
        }
      });
    });
  }*/

  comment_counter() {
    console.log("suca")
    this.threads.forEach((elem, ind) => {
      elem.commcounter = 0;
    });
    this.comments.forEach((elem, ind) => {
      elem.commcounter = 0;
    });
    this.comments.reverse().forEach((element, index) => {
      this.threads.forEach((elem, ind) => {
        if (elem.id === element.parentid) {
          elem.commcounter = elem.commcounter + 1 + element.commcounter;
        }
      });
      this.comments.forEach((elem, ind) => {
        if (elem.id === element.parentid) {
          elem.commcounter = elem.commcounter + 1 + element.commcounter;
        }
      });
    });
    this.comments.reverse();
  }

  addThread() {
    let newTD = new Thread(this.genID(), this.titolo, this.testo, this.user.username, [], [], "");
    this.threads.push(newTD);
    this.control.newthread = false;
  }

  addComment(i, threadcheck: boolean) {
    let txt: string = "";
    let parentidvalue: number = 0;
    let levelValue: number = 0;
    if (threadcheck) {
      parentidvalue = this.threads[i].id;
      levelValue = 1;
      txt = this.testo_;
      this.testo_ = "";
      this.threads[i].answer = false;
    } else {
      parentidvalue = this.comments[i].id;
      levelValue = this.comments[i].level + 1;
      txt = this.testo__;
      this.testo__ = "";
      this.comments[i].answer = false;
    }
    let tempID: number = this.genID();
    let newCM = new Comment(tempID, txt, this.user.username, parentidvalue, [], [], levelValue, "");
    this.comments.push(newCM);
    if (threadcheck) {
      this.comments.forEach((element, index) => {
        if (element.level >= 1) {
          element.view = false;
        }
      });
    } else {
      this.comments.forEach((element, index) => {
        if (element.level > this.comments[i].level) {
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
      if (element.id >= count) {
        count = element.id + 1;
      }
    });
    this.comments.forEach((element, index) => {
      if (element.id >= count) {
        count = element.id + 1;
      }
    });
    return count;
  }
}
