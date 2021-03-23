FROM node
LABEL Author Daniel Ward www.danieljaward.com
WORKDIR /
RUN apt-get update
COPY . .
ENTRYPOINT ["node","index.js"]