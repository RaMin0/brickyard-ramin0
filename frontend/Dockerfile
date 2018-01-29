FROM node:9.4.0-alpine
LABEL maintainer="Ramy Aboul Naga <ramy.naga@gmail.com"

ENV APP_ROOT /app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

ENV PATH=$APP_ROOT/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock    ./

RUN yarn install

COPY . ./

CMD ["node"]

RUN chmod +x .docker/scripts/entrypoint.sh
ENTRYPOINT [".docker/scripts/entrypoint.sh"]
