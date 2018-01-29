FROM ruby:2.4.0-alpine
LABEL maintainer="Ramy Aboul Naga <ramy.naga@gmail.com"

RUN apk add --no-cache --update build-base \
                                linux-headers \
                                git \
                                postgresql-dev \
                                nodejs \
                                tzdata

ENV RAILS_ROOT /app
RUN mkdir $RAILS_ROOT
WORKDIR $RAILS_ROOT

RUN echo "gem: --no-rdoc --no-ri" >> "$HOME/.gemrc"
RUN gem install bundler

COPY Gemfile* ./

RUN bundle install --jobs `expr $(cat /proc/cpuinfo | grep -c "cpu cores") - 1` --retry 3

COPY . ./

CMD ["irb"]

RUN chmod +x .docker/scripts/entrypoint.sh
ENTRYPOINT [".docker/scripts/entrypoint.sh"]
