import {TraceEvent} from "./trace-event";
import {Page} from "./page";

export interface EventsService {
    connect(): Promise<any>;
    postOptions(): Promise<any>;
    getTraceEvent(sequenceNumber: number): Promise<TraceEvent>;
    requestTraceEvents(): Promise<any>;
    clear(): void;
    disconnect(force:boolean): void;
    getPageContent(eventNumber: number, pageName: string): Promise<Page>;
}
