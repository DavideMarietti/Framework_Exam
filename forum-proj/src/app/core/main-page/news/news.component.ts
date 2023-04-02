import { Component } from '@angular/core';
import {NewsService} from "./news.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  symbol: string[] = ['IBM', 'TSCO', 'MSFT', 'NFLX', 'GM', 'V'];
  stockNews: any[] = [];
  selected: string = "IBM";

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    console.log("ngOnInit chiamato")
    lastValueFrom(this.newsService.getNews("IBM")).then(
      stocknews => {
        this.stockNews = stocknews;
        console.log("get News lanciato");
      });
  }

  searchNews(i){
    this.selected = this.symbol[i];
    this.stockNews.forEach((element, index) => {
      this.stockNews.splice(index, 1);
    });
    lastValueFrom(this.newsService.getNews(this.selected)).then(
      stocknews => {
        this.stockNews = stocknews;
        console.log("component file: ", this.stockNews);
        console.log("numero news: ", this.stockNews.length);
      });
  }
}
