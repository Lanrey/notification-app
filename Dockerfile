FROM node:18.15-slim
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
COPY ./notes-protos-nodejs /app/
EXPOSE 30001
CMD ["npm", "run", "start"]
