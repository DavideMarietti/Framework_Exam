import {Component, Input} from '@angular/core';
import {Comment, Thread, Utente} from "../../../variable-type";
import {lastValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ThreadsService} from "../threads/threads.service";
import {ProfileService} from "./profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: Utente;

  threads: Thread[] = [];
  comments: Comment[] = [];

  ncomm: number = 0;
  ntrh: number = 0;
  isFetching = false;
  errorFetching = null;

  private errorSub: Subscription;

  constructor(private http: HttpClient, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.errorSub = this.profileService.error.subscribe(errorMessage => {
      // @ts-ignore
      this.errorFetching = errorMessage;
    });

    this.isFetching = true;


    const promiseThreads = lastValueFrom(this.profileService.fetchThreads()).then(
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
    const promiseComments = lastValueFrom(this.profileService.fetchComments()).then(
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
      this.countComments();
      this.countThreads();
    });
  }

  countComments() {
    this.ncomm = 0;
    this.comments.forEach((element, index) => {
      if(element.autore === this.user.username){
        this.ncomm++;
      }
    });
  }

  countThreads() {
    this.ntrh = 0;
    this.threads.forEach((element, index) => {
      if(element.autore === this.user.username){
        this.ntrh++;
      }
    });
  }
}
