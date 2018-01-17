# Brickyard RaMin0

The vehicle production factory.

## App Dependencies
The versions supplied were used during the development of this app. The app should be backward/forward compatible with older versions, so feel free to use older/newer versions but at your own risk.

* **Ruby** 2.4.0p0
* **Rails** 5.1.4
* **Postgres** 10.1

## Installing
After cloning the app, you need to run the following commands within the app's directory to get things up and running.

* Make a copy of `config/_database.yml` and edit it to your heart's content.

    `cp config/_database.yml config/database.yml`

* Do the same for `config/_secrets.yml`.

    `cp config/_secrets.yml config/secrets.yml`

* Install the app's gem dependencies using `bundler`.

    `bundle install`

* Create a fresh copy of the database.

    `bundle exec rake db:create db:migrate`

* Seed the database with some sample data to get things up and running quickly.

    `bundle exec rake db:seed`

## Running

To start the server, run the following command.

  `bundle exec rails s`

## Testing

The current specs can be run using the following command.

  `bundle exec rspec`

## Documentation

The app uses simple comments throughout the code to explain complex logic, but most of the time the code itself will be self explanatory and straight forward.

### API Documentation<a name="doc-api"></a>

## Future Improvements

## Getting in Touch

Feel free to drop me a line if you have any comments/suggestions. I'm also welcoming any PRs and code reviewing comments.
