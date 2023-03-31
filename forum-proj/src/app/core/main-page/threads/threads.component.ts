import {Component, Input, OnInit, AfterContentInit} from '@angular/core';
import {Comment, Controller, Thread, Utente} from "../../../variable-type";
import {ThreadsService} from "./threads.service";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Subscription} from "rxjs";

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


    const promiseThreads = lastValueFrom(this.threadService.fetchThreads()).then(
      threads => {
        this.isFetching = false;
        this.threads = threads;
        this.threads.forEach((element, index) => {
          element.view = true;
          element.expand = false;
          element.answer = false;
        });
      })
      .catch(
        error => {
          this.isFetching = false;
          this.errorFetching = error.message;
        }
      );

    this.isFetching = true;
    const promiseComments = lastValueFrom(this.threadService.fetchComments()).then(
      comments => {
        this.isFetching = false;
        this.comments = comments;
        this.comments.forEach((element, index) => {
          element.view = false;
          element.answer = false;
        });
      }).catch(
      error => {
        this.isFetching = false;
        this.errorFetching = error.message;
      }
    );

    Promise.all([promiseThreads, promiseComments]).then(() => {
      this.comment_counter();
    });
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
        if (element.parentid === this.threads[i].id && element.level === 0) {
          element.view = !element.view;
        } else {
          element.view = false;
        }
      });
    } else {
      this.comments.forEach((element, index) => {
        if (element.parentid === this.comments[i].id && element.level > 0) {
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

  comment_counter() {
    this.threads.forEach((element, index) => {
      element.commcounter = 0;
    });
    this.comments.forEach((element, index) => {
      element.commcounter = 0;
    });
    this.comments.reverse().forEach((element, index) => {
      this.threads.forEach((elem, ind) => {
        if (elem.id === element.parentid && element.level === 0) {
          elem.commcounter = elem.commcounter + 1 + element.commcounter;
        }
      });
      this.comments.forEach((elem, ind) => {
        if (elem.id === element.parentid && element.level > 0) {
          elem.commcounter = elem.commcounter + 1 + element.commcounter;
        }
      });
    });
    this.comments.reverse();
  }

  addThread() {
    lastValueFrom(this.threadService.createThread(this.titolo, this.testo, this.user.username)).then(
      thread => {
        console.log("thread:", thread)
        this.isFetching = false;
        this.threads.push(new Thread(thread.id, thread.titolo, thread.testo, thread.autore, thread.like, thread.dislike, thread.creato));
      })
      .catch(
        error => {
          this.isFetching = false;
          this.errorFetching = error.message;
        }
      );
    this.control.newthread = false;
  }

  addComment(i, threadcheck: boolean) {
    let txt: string = "";
    let parentidvalue: number = 0;
    let levelValue: number = 0;
    if (threadcheck) {
      parentidvalue = this.threads[i].id;
      levelValue = 0;
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
    const promiseAddComment = lastValueFrom(this.threadService.createComment(txt, this.user.username, parentidvalue, levelValue)).then(
      comment => {
        console.log("comment:", comment)
        this.isFetching = false;
        this.comments.push(new Comment(comment.id, comment.testo, comment.autore, comment.parentid, comment.like, comment.dislike, comment.level, comment.creato));
      })
      .catch(
        error => {
          this.isFetching = false;
          this.errorFetching = error.message;
        }
      );

    Promise.all([promiseAddComment]).then(() => {
      if (threadcheck) {
        this.comments.forEach((element, index) => {
          if (element.level >= 0) {
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
    });
  }

  delete(i, threadcheck: boolean){
    if(threadcheck){

    }else{

    }
  }
}
