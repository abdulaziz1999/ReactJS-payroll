FROM node:14.18.1-alpine3.14
WORKDIR /app
COPY ./ ./
COPY package.json ./
RUN npm install
RUN npm run build
RUN npm i -g serve
EXPOSE 5000/tcp
CMD ["serve", "-s", "build"]