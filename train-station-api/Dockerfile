FROM node:20
WORKDIR /api
COPY package.json /api
RUN npm install
COPY . /api
CMD ["node","index.js"]