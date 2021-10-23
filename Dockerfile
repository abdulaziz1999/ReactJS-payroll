FROM node:alpine
WORKDIR /
COPY ./ ./
COPY package.json ./
RUN npm install -g npm@8.1.1
RUN npm run build
CMD ["npm", "run", "start"]