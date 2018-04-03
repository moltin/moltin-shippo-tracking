const { json, send } = require('micro')
const { router, post } = require('microrouter')
const cors = require('micro-cors')()
const motlinGateway = require('@moltin/sdk').gateway

const moltin = motlinGateway({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_CLIENT_SECRET
})

const moltinSecret = process.env.MOLTIN_SECRET_KEY

module.exports = cors(
  router(
    post('/', async (req, res) => {
      if ((await req.headers['x-moltin-secret-key']) != moltinSecret)
        return send(res, 401)

      const {
        data: {
          tracking_status: {
            status: delivery_status,
            status_details: delivery_details,
            status_date: delivery_date
          },
          extra: { orderId }
        }
      } = await json(req)

      try {
        const order = await moltin.Orders.Update(orderId, {
          id: orderId,
          delivery_status,
          delivery_details,
          delivery_date
        })

        send(res, 200)
      } catch (errors) {
        send(res, 500, errors)
      }
    })
  )
)
