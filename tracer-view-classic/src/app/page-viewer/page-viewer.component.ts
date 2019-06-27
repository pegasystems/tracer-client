import {Component, OnInit} from '@angular/core';



import {Page} from "../../../../tracer-client/src/page";
import {PagesService} from "../pages.service";
import {Client} from "../../../../tracer-client/src/client";
import {TraceEvent} from "../../../../tracer-client/src/trace-event";
import {TracerEventsService} from "../tracer-events.service";


@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css']
})


export class PageViewerComponent implements OnInit {



  pageService: PagesService;
  client: Client;
  page: Page;

  constructor() {



    this.client.registerEventCallback((event) =>{

      let traceEvent = new TraceEvent();

      traceEvent.primaryPage = event.primaryPageName;
      traceEvent.sequenceNumber = event.sequenceNumber;
      traceEvent.primaryPageName = event.primaryPageName;

      this.page = this.pageService.getPageContent(traceEvent.sequenceNumber,traceEvent.primaryPageName);


      //be able to represe

    });


  }

  ngOnInit() {
  }
}
