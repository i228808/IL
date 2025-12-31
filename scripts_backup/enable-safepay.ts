
import { Modules } from "@medusajs/framework/utils"
import { ExecArgs } from "@medusajs/framework/types"

export default async function enableSafepay({ container }: ExecArgs) {
    const regionService = container.resolve(Modules.REGION)
    const paymentModuleService = container.resolve(Modules.PAYMENT)
    const logger = container.resolve("logger")

    // 1. List Payment Providers
    const providers = await paymentModuleService.listPaymentProviders()
    logger.info(`Available Payment Providers: ${providers.map(p => p.id).join(", ")}`)

    const safepayId = providers.find(p => p.id.includes("safepay"))?.id

    if (!safepayId) {
        logger.error("Safepay provider not found!")
        return
    }

    logger.info(`Found Safepay Provider: ${safepayId}`)

    // 2. Find Pakistan Region
    const regions = await regionService.listRegions({ currency_code: "pkr" })
    const region = regions[0]

    if (!region) {
        logger.error("Region 'Pakistan' (PKR) not found.")
        return
    }

    logger.info(`Updating Region: ${region.name} (${region.id})`)

    // 3. Update Region Payment Providers
    // In v2, we might need a workflow or just update the region properties if it supports it directly.
    // Actually regionService.updateRegions usually takes payment_providers array of IDs.

    await regionService.updateRegions(region.id, {
        payment_providers: [
            ...(region.payment_providers?.map(p => p.id) || []),
            safepayId
        ]
    })

    logger.info(`Successfully added ${safepayId} to ${region.name}`)
} 
