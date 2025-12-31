import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)
  const query = container.resolve("query")

  // Fetch order with all necessary fields
  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "currency_code",
      "total",
      "subtotal",
      "created_at",
      "items.*",
      "shipping_address.*",
    ],
    filters: {
      id: data.id,
    },
  })

  const order = orders[0]

  if (!order || !order.email) {
    logger.warn(`Order ${data.id} not found or missing email, skipping notification.`)
    return
  }

  // Helper: Format Currency
  const formatMoney = (amount: number) => {
    // PKR amounts are already in the correct format (not in cents)
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: order.currency_code.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const orderNumber = order.display_id?.toString() || data.id.split("_")[1].toUpperCase()
  const subject = `Order Confirmed #${orderNumber}`
  const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // DEBUG: Log the entire order structure
  logger.info(`=== ORDER DEBUG START ===`)
  logger.info(`Order ID: ${data.id}`)
  logger.info(`Order Total: ${order.total}`)
  logger.info(`Currency: ${order.currency_code}`)
  logger.info(`Items Count: ${order.items?.length || 0}`)
  if (order.items && order.items.length > 0) {
    order.items.forEach((item: any, index: number) => {
      logger.info(`Item ${index}: ${JSON.stringify(item)}`)
    })
  }
  logger.info(`=== ORDER DEBUG END ===`)

  // Prepare Address String
  const addr = order.shipping_address
  const addressHtml = addr
    ? `
      <p style="margin: 0; color: #F0F0E8;">${addr.first_name} ${addr.last_name}</p>
      <p style="margin: 0; color: rgba(240, 240, 232, 0.7);">${addr.address_1}</p>
      ${addr.address_2 ? `<p style="margin: 0; color: rgba(240, 240, 232, 0.7);">${addr.address_2}</p>` : ""}
      <p style="margin: 0; color: rgba(240, 240, 232, 0.7);">${addr.city}, ${addr.province || ""} ${addr.postal_code}</p>
      <p style="margin: 0; color: rgba(240, 240, 232, 0.7);">${addr.country_code?.toUpperCase()}</p>
    `
    : `<p>No shipping address provided.</p>`

  // Generate Items HTML Rows (Using Tables for Email Compatibility)
  const itemsHtml = (order.items || [])
    .map((item: any) => {
      const itemQty = item.quantity || 1
      const itemPrice = item.unit_price || 0
      return `
        <tr>
          <td style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span style="font-weight: bold; font-size: 16px; display: block; color: #fff;">${item.title}</span>
            <span style="font-size: 14px; color: rgba(240, 240, 232, 0.7);">Qty: ${itemQty}</span>
          </td>
          <td style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right; vertical-align: top;">
            <span style="font-size: 16px; font-weight: bold; color: #D4AF37;">${formatMoney(itemPrice * itemQty)}</span>
          </td>
        </tr>
      `
    })
    .join("")

  // Premium Email Template
  // Note: Switched to Table layout for better Outlook/Gmail support
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0F1510; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #F0F0E8; }
  table { border-collapse: collapse; width: 100%; }
  .container { max-width: 600px; margin: 0 auto; background-color: #1A3C28; border: 1px solid #263c28; }
  .header { padding: 40px 20px; text-align: center; border-bottom: 2px solid #D4AF37; background-color: #1A3C28; }
  .logo { max-width: 200px; height: auto; display: block; margin: 0 auto; }
  .content { padding: 30px 20px; }
  .text-gold { color: #D4AF37; }
  .section-title { color: #D4AF37; font-size: 18px; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; }
  .totals { margin-top: 30px; padding-top: 20px; border-top: 2px solid #D4AF37; text-align: right; }
  .grand-total { font-size: 28px; color: #D4AF37; font-weight: bold; margin-top: 15px; }
  .footer { padding: 20px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.1); }
  a { color: #D4AF37; text-decoration: none; }
</style>
</head>
<body style="background-color: #0F1510;">
  <div class="container">
    
    <div class="header">
      <img src="https://intimalustre.com/logo.png" alt="Intima Lustre" class="logo" />
    </div>

    <div class="content">
      <h2 style="font-size: 20px; color: #D4AF37; margin-top: 0; text-align: center;">Thank you for your order!</h2>
      <p style="text-align: center; margin-bottom: 30px;">We are getting your order ready to be shipped.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
        <tr>
          <td width="50%" valign="top">
             <p style="margin: 0; font-size: 14px; color: rgba(240, 240, 232, 0.7);">Order Number</p>
             <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #D4AF37;">#${orderNumber}</p>
          </td>
          <td width="50%" valign="top" style="text-align: right;">
             <p style="margin: 0; font-size: 14px; color: rgba(240, 240, 232, 0.7);">Date</p>
             <p style="margin: 5px 0 0 0; font-size: 16px;">${dateStr}</p>
          </td>
        </tr>
      </table>

      <div style="margin-bottom: 30px;">
        <h3 class="section-title">Shipping Address</h3>
        ${addressHtml}
      </div>

      <h3 class="section-title">Order Summary</h3>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${itemsHtml}
      </table>

      <div class="totals">
        <div class="grand-total">
          Total: ${formatMoney(order.total)}
        </div>
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Intima Lustre. All rights reserved.</p>
      <p>Premium Wellness Products</p>
      <p style="margin-top: 15px;">If you have any questions, please reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `

  try {
    await notificationModuleService.createNotifications({
      to: order.email,
      channel: "email",
      template: "order-placed", // Ensure this ID exists in your notification provider setup
      data: {
        subject,
        htmlContent,
        // Passing specific data keys in case you switch to a template engine (like SendGrid dynamic templates) later
        order_id: orderNumber,
        order_total: formatMoney(order.total),
        customer_name: `${order.shipping_address?.first_name || ""} ${order.shipping_address?.last_name || ""}`,
      },
    })
    logger.info(`Sent order confirmation email to ${order.email} for order ${data.id}`)
  } catch (error) {
    logger.error(`Failed to send order confirmation email: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}