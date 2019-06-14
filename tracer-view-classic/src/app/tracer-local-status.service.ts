import {Injectable} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {TraceEvent} from "./trace-event";

@Injectable({
  providedIn: 'root'
})
export class TracerLocalStatusService {

  status: string;
  statusMessage: string;

  status$: Observable<string>;
  messages$: Observable<string>;

  //An array of observers, not observables, strings
  statusMessageObservers: Array<Observer<string>>;
  statusObservers: Array<Observer<string>>;


  constructor() {
    this.statusObservers = new Array<Observer<string>>();
    this.statusMessageObservers = new Array<Observer<string>>();
    this.status = "Tracing...";
    this.statusMessage = "(No message)";

    //Creates a new observable and each time an observer subscribes to the observable,
    //push the subscriber into 1 of 2 arrays  of observers of strings (array of messages or array of statuses)
    this.status$ = new Observable((statusObserver) => {
      this.statusObservers.push(statusObserver);
    });

   this.messages$ = new Observable((messageObserver) => {
      this.statusMessageObservers.push(messageObserver);
    });
  }

  setStatus(status: string): void {
    this.status = status;

    for(let observer of this.statusObservers)
      observer.next(this.getStatus());
  }

  getStatus(): string {
    return this.status;
  }



  //observer.next(stuff) publishes the stuff to all subscribers subscribed to that observable
  setStatusMessage(statusMessage: string): void {
    this.statusMessage = statusMessage;

    for (let observer of this.statusMessageObservers)
      observer.next(this.getStatusMessage());
  }

  getStatusMessage(): string {
    return this.statusMessage;
  }


  onStatusMessageUpdate(): Observable<string> {
    return this.messages$;

  }

  onStatusUpdate(): Observable<string> {
    return this.status$;
  }
}


