import {TraceEvent} from "./trace-event";

export interface EventsService {
    connect(): Promise<any>;
    postOptions(): Promise<any>;
    getTraceEvent(sequenceNumber: number): Promise<TraceEvent>;
    requestTraceEvents(): Promise<any>;
    clear(): void;
    disconnect(force:boolean): void;
}