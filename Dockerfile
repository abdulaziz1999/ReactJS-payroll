FROM node:alpine
COPY ./ ./
RUN npm install -g npm@8.1.1
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]