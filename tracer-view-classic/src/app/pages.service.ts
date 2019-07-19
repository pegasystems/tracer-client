import {Injectable} from '@angular/core';
import {Observable, Observer} from "rxjs";


import {Page} from "../../../tracer-client/src/page";
import {TracerEventsService} from "./tracer-events.service";


@Injectable({
  providedIn: 'root'
})


export class PagesService {


  constructor() {}




  //Give me page named X from traceNumber Y
  //So if X was an embedded page in traceNumber y,
  //only the embedded page would be returned and the parent or child pages of the returned page won't be returned?


 /* getPageContent(eventNumber: number, pageName: string):  Page {
    let pg = new Page("sadsadsa");
    pg.children[pageName] = "getPageContentReturn";
    return pg;
  }*/
}
