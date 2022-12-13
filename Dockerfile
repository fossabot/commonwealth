FROM node:14-alpine

WORKDIR /monorepo

COPY ./package.json .
COPY ./packages/commonwealth/package.json  ./packages/commonwealth/

RUN apk add --update --no-cache python3 build-base gcc && ln -sf \
/usr/bin/python3 /usr/bin/python

RUN npm i -g yarn --force && apk add git && yarn --ignore-engines

COPY . . 
COPY --from=builder /packages/commonwealth/build /packages/commonwealth/build

WORKDIR /monorepo/packages/commonwealth
CMD ["true"]

