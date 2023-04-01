import { Component } from '@angular/core';
import {NewsService} from "./news.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  symbol: string[] = ['IBM', 'TSCO'];
  stockNews: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {

  }

  searchNews(i){
    this.stockNews.forEach((element, index) => {
      this.stockNews.splice(index, 1);
    });
    lastValueFrom(this.newsService.getNews(this.symbol[i])).then(
      stocknews => {
        this.stockNews = stocknews;
        console.log("component file: ", this.stockNews);
        console.log("numero news: ", this.stockNews.length);
      });
  }
}
