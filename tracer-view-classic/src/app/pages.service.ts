import {Injectable} from '@angular/core';
import {Observable, Observer} from "rxjs";


import {Page} from "../../../tracer-client/src/page";
import {TracerEventsService} from "./tracer-events.service";


@Injectable({
  providedIn: 'root'
})


export class PagesService {


  constructor() {}


 /* getPageContent(eventNumber: number, pageName: string):  Page {
    let pg = new Page("sadsadsa");
    pg.properties[pageName] = "getPageContentReturn";
    return pg;
  }*/
}
