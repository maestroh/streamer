# docker run -it -p 8080:8080 -v ~/Downloads/tuba:/music streamer:v1
# eval "$(docker-machine env default)"

FROM node:6.9.2-alpine
ENV SHELL /bin/sh

RUN apk add --update nginx \
    && mkdir -p /run/nginx \
    && npm install pm2 -g

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app
ADD ./ /app

WORKDIR /app/frontend
RUN rm -rf node_modules \
    && npm install \
    && npm run build
    
WORKDIR /app/backend
RUN rm -rf node_modules \
    && npm install

WORKDIR /app
CMD run.sh