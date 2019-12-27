FROM node
WORKDIR /usr/src/app
COPY tracer-client ./tracer-client
WORKDIR /usr/src/app/tracer-client
RUN npm install
RUN npm run build
COPY tracer-view-classic /usr/src/app/tracer-view-classic
WORKDIR /usr/src/app/tracer-view-classic
RUN npm install
RUN npm run build
EXPOSE 4200
CMD ["npm","start"]
