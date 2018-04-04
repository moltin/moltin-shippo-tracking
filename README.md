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
```

`npm install`

`npm run dev`

## ⛽️ Usage

Once you have the function deployed, take a note of the immutable `now.sh` url.

Next head over to the Shippo [API Settings](https://app.goshippo.com/api) area, add a new webhook with the following details:

* **Event Type**: Track Updated
* **Mode**: Live
* **URL**: _URL provided by `now.sh`_

Finally you'll need to extend the moltin Orders resource with [Flows](https://moltin.com/content). Head over to the [moltin dashboard](https://dashboard.moltin.com/app/settings/flows) and **create a new Flow**.

* **Name**: Orders
* **Slug**: `orders`
* **Description**: _Anything you want_
* **Enabled**: `true`

Next, edit the Flow and add the following **fields**:

* **Field** Type: `string`
  **Slug**: `delivery_status`
  **Name**: Delivery status (managed by Shippo)
  **Description**: _Anything you want_
  **Enabled**: `true`

* **Field** Type: `string`
  **Slug**: `delivery_details`
  **Name**: Delivery details (managed by Shippo)
  **Description**: _Anything you want_
  **Enabled**: `true`

* **Field** Type: `string`
  **Slug**: `delivery_date`
  **Name**: Delivery date (managed by Shippo)
  **Description**: _Anything you want_
  **Enabled**: `true`

⚠️ Once an `order_status` is set to `DELIVERED` this function will no longer function.

## 🚀 Deploy

You can easily deploy this function to [now](https://now.sh).
