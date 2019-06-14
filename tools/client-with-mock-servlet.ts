import {Client as Tracer} from '../tracer-client/src/client'
import {EventsServiceSimpleMock} from '../tracer-client/src/events-service-simple-mock';
// @ts-ignore
window.Tracer = Tracer;
// @ts-ignore
window.MockTracerServlet = EventsServiceSimpleMock;
