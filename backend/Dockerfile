FROM node:lts-alpine
WORKDIR /backend-mypicz
COPY . .
RUN npm install
ENV MYSQL_HOST default
ENV MYSQL_USER default
ENV MYSQL_PASSWORD default
ENV MYSQL_DATABASE default    
ENV GOOGLE_APPLICATION_CREDENTIALS default
EXPOSE 2000
CMD ["npm","start"]