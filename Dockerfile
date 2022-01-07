FROM node:12-alpine

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

RUN npm install typescript -g

RUN mkdir -p /home/node/rest_afip/
RUN chown node:node /home/node/rest_afip

WORKDIR /home/node/rest_afip

USER node
COPY --chown=node:node . .

RUN npm run build

EXPOSE 3033

CMD [ "node", "lib/server.js" ]
