FROM node
WORKDIR /usr/src/app
COPY tracer-client ./tracer-client
WORKDIR /usr/src/app/tracer-client
RUN npm install
RUN npm run build
COPY dev-tools /usr/src/app/dev-tools
RUN npm install
RUN npm start-file-server
WORKDIR /usr/sec/app/dev-tools
COPY tracer-view-classic /usr/src/app/tracer-view-classic
WORKDIR /usr/src/app/tracer-view-classic
RUN npm install
RUN npm run build
EXPOSE 4200
CMD ["npm","start"]
