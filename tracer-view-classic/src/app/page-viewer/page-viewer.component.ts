import {Component, OnInit, Input} from '@angular/core';

import {Page} from "../../../../tracer-client/src/page";
import {PagesService} from "../pages.service";


@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css']
})


export class PageViewerComponent implements OnInit {


 // @Input() page: Page;
  pageServices: PagesService;

  constructor() {


   // this.page = this.pageServices.getPageContent(2,'s');
  }

  ngOnInit() {}
}
