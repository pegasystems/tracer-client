import { Injectable } from '@angular/core';
import {Observable,Observer} from "rxjs";


import {Page} from "../../../tracer-client/src/page";
import {TracerEventsService} from "./tracer-events.service";


@Injectable({
  providedIn: 'root'
})


export class PagesService {
  page:Page;

  constructor() {}

  getPageContent(eventNumber:number, pageName:string): Page {
    let pageArray = this.page.properties;

    let page = pageArray[pageName];

    return page;
  }


}
