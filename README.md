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

| Event Type    | Mode   | URL                        |
| ------------- | ------ | -------------------------- |
| Track Updated | `Live` | _URL provided by `now.sh`_ |

Finally you'll need to extend the moltin Orders resource with [Flows](https://moltin.com/content). Head over to the [moltin dashboard](https://dashboard.moltin.com/app/settings/flows) and **create a new Flow**.

| Name   | Slug     | Description         | Enabled |
| ------ | -------- | ------------------- | ------- |
| Orders | `orders` | _Anything you want_ | `true`  |

Next, edit the Flow and add the following **fields**:

| Field Type | Slug               | Name                                 | Description         | Enabled |
| ---------- | ------------------ | ------------------------------------ | ------------------- | ------- |
| `string`   | `delivery_date`    | Delivery status (managed by Shippo)  | _Anything you want_ | `true`  |
| `string`   | `delivery_details` | Delivery details (managed by Shippo) | _Anything you want_ | `true`  |
| `string`   | `delivery_date`    | Delivery date (managed by Shippo)    | _Anything you want_ | `true`  |

⚠️ Once an `order_status` is set to `DELIVERED` this function will no longer update your order.

## 🚀 Deploy

You can easily deploy this function to [now](https://now.sh).
