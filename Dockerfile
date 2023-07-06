# ######################################################################
# MULTI-STAGE BUILD
# ######################################################################
FROM docker.dynamix.com.br/ubuntu-server-build:2.0 as build

# User data directory, contains flows, config and nodes.
RUN mkdir /tmp/src

COPY package.json /tmp/src/package.json
COPY package-lock.json /tmp/src/package-lock.json

RUN cd /tmp/src/ && \
    npm install --production && \
    npm ddp

# ######################################################################
# MULTI-STAGE APP
# ######################################################################
FROM docker.dynamix.com.br/ubuntu-server:2.0

# User data directory, contains flows, config and nodes.
RUN mkdir /app

WORKDIR /app

COPY --from=build /tmp/src/node_modules /app/node_modules

ADD . /app/

ENV API_HOST "0.0.0.0"
ENV API_PORT 3002
ENV GRAPHQL_HOST "0.0.0.0"
ENV GRAPHQL_PORT 4000

EXPOSE 3002 4000

CMD ["npm", "run", "server:prod"]
