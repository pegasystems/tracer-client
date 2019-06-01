import {Client as Tracer} from '../src/client'
import {EventsServiceSimpleMock} from '../src/events-service-simple-mock';
// @ts-ignore
window.Tracer = Tracer;
// @ts-ignore
window.MockTracerServlet = EventsServiceSimpleMock;
