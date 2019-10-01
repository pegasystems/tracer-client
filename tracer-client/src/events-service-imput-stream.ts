import {EventsService} from "./events-service";
import {ToolbarState} from "./toolbar-state";
import {Page} from "./page";
import {TraceEvent} from "./trace-event";

export class EventsServiceImputStream implements EventsService {


    clear(): void {
        throw new Error("Method not implemented.");
    }

    connect(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    disconnect(force: boolean): void {
        throw new Error("Method not implemented.");
    }

    getPageContent(eventNumber: number, pageName: string): Promise<Page> {
        throw new Error("Method not implemented.");
    }

    getToolbarState(): Promise<ToolbarState> {
        throw new Error("Method not implemented.");
    }

    getTraceEvent(sequenceNumber: number): Promise<TraceEvent> {
        throw new Error("Method not implemented.");
    }

    postOptions(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    requestTraceEvents(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}