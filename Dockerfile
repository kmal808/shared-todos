FROM node:19.9.0-alpine3.16
WORKDIR /app
COPY package.json .
ARG DB_STRING
RUN npm install
COPY . .
EXPOSE 2121
ENV PORT 2121
RUN chown -R node /app
CMD ["npm", "run", "start"]

