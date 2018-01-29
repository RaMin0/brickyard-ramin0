# Brickyard RaMin0 - Backend

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

The API calls allowed against the app can be tried out using [PostMan](https://www.getpostman.com/). Make sure to import [this](https://www.getpostman.com/collections/eb6565ef5d020d29cb74) to see what you can do. PostMan uses environments to manage variables. Feel free to use mine as a starting template for yours.

<pre>
{
  "name": "Brikyard (Development)",
  "values": [
    { "enabled": true, "key": "base_url",           "value": "http://localhost:3000/api/v1", "type": "text" },
    { "enabled": true, "key": "executive_email",    "value": "executive@brickyard.eu",       "type": "text" },
    { "enabled": true, "key": "assembler_email",    "value": "assembler@brickyard.eu",       "type": "text" },
    { "enabled": true, "key": "executive_password", "value": "topsecret",                    "type": "text" },
    { "enabled": true, "key": "assembler_password", "value": "secret",                       "type": "text" },
    { "enabled": true, "key": "executive_token",    "value": "jRvkuhxMBnuHzhU7Ux13y2FL",     "type": "text" },
    { "enabled": true, "key": "assembler_token",    "value": "HjbBVRf527p44j96qWWsqhsz",     "type": "text" },
    { "enabled": true, "key": "vehicle_code",       "value": "DEMO",                         "type": "text" },
    { "enabled": true, "key": "vehicle_id",         "value": "1",                            "type": "text" },
    { "enabled": true, "key": "vehicle_state_name", "value": "Sold",                         "type": "text" },
    { "enabled": true, "key": "vehicle_state_code", "value": "s",                            "type": "text" }
  ]
}
</pre>

## Future Improvements

* Add specs for serializers.

## Getting in Touch

Feel free to drop me a line if you have any comments/suggestions. I'm also welcoming any PRs and code reviewing comments.
