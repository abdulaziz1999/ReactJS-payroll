FROM node:alpine
COPY ./ ./
RUN npm install -g npm@8.1.1
CMD ["npm", "run", "start"]