const { json, send } = require('micro')
const { router, post } = require('microrouter')
const cors = require('micro-cors')()
const motlinGateway = require('@moltin/sdk').gateway

const moltin = motlinGateway({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_CLIENT_SECRET
})

module.exports = cors(
  router(
    post('/', async (req, res) => {
      const {
        data: {
          tracking_status: {
            status: delivery_status,
            status_details: delivery_details,
            status_date: delivery_date
          },
          extra: { order_id }
        }
      } = await json(req)

      try {
        const { json: { data: order } } = await moltin.Orders.Get(order_id)

        if (order.delivery_status === 'DELIVERED') send(res, 400)

        await moltin.Orders.Update(order_id, {
          id: order_id,
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
