import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function debugProduct({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const productModule = container.resolve(Modules.PRODUCT)
    const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
    const apiKeyModule = container.resolve(Modules.API_KEY)

    logger.info("--- DEBUGGING PRODUCT VISIBILITY ---")

    // 1. Fetch Product
    const [product] = await productModule.listProducts({ handle: "dazeagra-herbal-oil" }, { relations: ["variants"] })

    if (!product) {
        logger.error("PRODUCT NOT FOUND by handle 'dazeagra-herbal-oil'")
    } else {
        logger.info(`Product Found: ${product.title} (${product.id})`)
        logger.info(`Status: ${product.status}`)
    }

    // 2. Fetch Product Sales Channels
    // Note: linking is handled by RemoteLink, but we can check via Modules if supported or via RemoteQuery
    // For v2, we often use remoteQuery to get graph.
    const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

    const productGraph = await remoteQuery({
        entryPoint: "product",
        fields: ["id", "title", "sales_channels.id", "sales_channels.name"],
        filters: { handle: "dazeagra-herbal-oil" }
    })

    const productData = productGraph[0]
    if (productData) {
        logger.info(`Product Sales Channels: ${JSON.stringify(productData.sales_channels, null, 2)}`)
    }

    // 3. Fetch All Sales Channels
    const channs = await salesChannelModule.listSalesChannels()
    logger.info("Available Sales Channels:")
    channs.forEach(c => logger.info(`- ${c.name} (${c.id})`))

    // 4. Fetch API Keys and their scopes
    const keys = await apiKeyModule.listApiKeys({ type: "publishable" }) // Fetch all publishable keys

    logger.info("Publishable API Keys:")
    for (const key of keys) {
        // We need to find the sales channels for this key.
        const keyGraph = await remoteQuery({
            entryPoint: "api_key",
            fields: ["id", "token", "sales_channels.id", "sales_channels.name"],
            filters: { id: key.id }
        })
        const keyData = keyGraph[0]
        logger.info(`Key Token: ${key.token.substring(0, 10)}...`)
        logger.info(`Key Channels: ${JSON.stringify(keyData.sales_channels, null, 2)}`)
    }

    logger.info("--- DEBUG END ---")
}
