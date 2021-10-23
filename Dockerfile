FROM node:14.18.1-alpine3.14
WORKDIR /app
COPY ./ ./
COPY package.json ./
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]