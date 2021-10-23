FROM node:alpine
COPY ./ ./
RUN npm i
RUN npm run build
WORKDIR /build
CMD ["npm", "run", "start"]