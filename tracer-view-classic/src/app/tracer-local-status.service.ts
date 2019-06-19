import {Injectable} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {TraceEvent} from "./trace-event";

@Injectable({
  providedIn: 'root'
})
export class TracerLocalStatusService {

  status: string;
  statusMessage: string;
  event: TraceEvent;

  status$: Observable<string>;
  messages$: Observable<string>;


  //An array of observers, not observables, strings
  statusMessageObservers: Array<Observer<string>>;
  statusObservers: Array<Observer<string>>;

  constructor() {
    this.statusObservers = new Array<Observer<string>>();
    this.statusMessageObservers = new Array<Observer<string>>();


    //Creates a new observable and each time an observer subscribes to the observable,
    //the actions inside are executed. In this case, the observer is pushed into an array of observers
    //for that observable
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

  //observer.next(stuff) publishes the next item to all subscribers subscribed to that observable
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


