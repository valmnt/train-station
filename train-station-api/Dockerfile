FROM node:20
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /src
RUN npx tsc
CMD ["node","./dist/app.js"]