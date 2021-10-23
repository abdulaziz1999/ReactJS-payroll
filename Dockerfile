FROM node:alpine:3.14
WORKDIR /build
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]