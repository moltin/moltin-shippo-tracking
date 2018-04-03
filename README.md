# moltin-shippo-tracking

> 📦 Update orders with current delivery status by Shippo

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/notrab/moltin-shippo-integration&env=MOLTIN_CLIENT_ID&env=MOLTIN_SECRET_KEY&env=SHIPPO_PRIVATE_KEY&env=MOLTIN_WEBHOOK_SECRET)

Asynchronous microservice that is triggered by [Shippo](https://goshippo.com) webhooks. Built with [Micro](https://github.com/zeit/micro) 🤩

## 🛠 Setup

Both a moltin _and_ Shippo account are needed for this to function.

Create a `.env` at the project root with the following credentials.

```dosini
MOLTIN_CLIENT_ID=
MOLTIN_CLIENT_SECRET=
MOLTIN_SECRET_KEY=
```

`npm install`

`npm run dev`

## ⛽️ Usage

Once you have the function deployed, take a note of the immutable `now.sh` url.

<!-- You can use this URL to make requests, providing you send along `X-MOLTIN-SECRET-KEY` in the request header. -->

Next head over to the Shippo [API Settings](https://app.goshippo.com/api/) area, add a new webhook with the following details;

* Event Type: Track Updated
* Mode: Live
* URL: _URL provided by `now.sh`_

## 🚀 Deploy

You can easily deploy this function to [now](https://now.sh).
