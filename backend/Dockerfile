FROM node:16-alpine
WORKDIR /backend-mypicz
COPY . .
RUN npm install
ENV MYSQL_HOST default
ENV MYSQL_USER default
ENV MYSQL_PASSWORD default
ENV MYSQL_DATABASE default    
EXPOSE 2000
CMD ["npm","start"]