FROM node:slim
ENV NODE_ENV=production
WORKDIR /home/mateusedival/Documents/api/nest-mongoose-boilerplate/Dockerfile
COPY . .
RUN npm i -g @nestjs/cli
RUN npm install 
RUN npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 3002