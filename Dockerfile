FROM node:8

ADD ./thf-conference-api /sources
WORKDIR /sources

RUN npm i


FROM node:8-alpine

RUN apk add --update tzdata
ENV TZ America/Sao_Paulo

RUN mkdir -p /var/log/thf-conference-api
RUN chown -R node:node /var/log/thf-conference-api

COPY --from=0 /sources /sources

WORKDIR /sources

EXPOSE 8080:8080

CMD ["npm", "run", "start:prod"]