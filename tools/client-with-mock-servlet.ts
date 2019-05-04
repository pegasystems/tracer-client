import {Client as Tracer} from '../src/client'
import {MockTracerServlet} from './mock-tracer-servlet';
// @ts-ignore
window.Tracer = Tracer;
// @ts-ignore
window.MockTracerServlet = MockTracerServlet;
