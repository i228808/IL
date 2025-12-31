import {
    createApiKeysWorkflow,
    createProductCategoriesWorkflow,
    createProductsWorkflow,
    createRegionsWorkflow,
    createSalesChannelsWorkflow,
    createShippingOptionsWorkflow,
    createStockLocationWorkflow,
    createTaxRegionsWorkflow,
    linkSalesChannelsToStockLocationWorkflow,
    updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"
import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function seedDaZeagra({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
    const pricingModuleService = container.resolve(Modules.PRICING)

    logger.info("Seeding Da'Zeagra Herbal Oil data...")

    // 1. Ensure PKR Region Exists (Idempotent-ish check)
    // We'll just create it, if it exists it might error or we can fetch first. 
    // For simplicity in this script, we'll try to fetch, if not found, create.
    // Actually, standard seed re-runs are fine usually.

    // 1. Ensure PKR Region Exists (Idempotent-ish check)
    // SKIPPED: Region already exists, skipping creation to avoid error.
    // const { result: regions } = await createRegionsWorkflow(container).run({ ... })

    logger.info(`Assuming Region for PKR exists...`)

    // 2. Create the Product
    const { result: products } = await createProductsWorkflow(container).run({
        input: {
            products: [
                {
                    title: "Da'Zeagra Herbal Oil",
                    handle: "dazeagra-herbal-oil",
                    description: "Experience the pinnacle of natural wellness with Da'Zeagra Herbal Oil. Crafted for vitality, intimacy, and enduring strength, this premium blend is your secret to a more fulfilling life.",
                    subtitle: "Natural Wellness & Vitality Support",
                    is_giftcard: false,
                    discountable: true,
                    images: [
                        { url: "http://localhost:8000/products/dazeagra-1.png" },
                        { url: "http://localhost:8000/products/dazeagra-2.png" },
                        { url: "http://localhost:8000/products/dazeagra-3.png" },
                    ],
                    options: [
                        {
                            title: "Volume",
                            values: ["Standard Bottle"],
                        },
                    ],
                    variants: [
                        {
                            title: "Standard Bottle",
                            sku: "DAZIE-001",
                            options: {
                                "Volume": "Standard Bottle",
                            },
                            manage_inventory: false,
                            prices: [
                                {
                                    amount: 2500,
                                    currency_code: "pkr",
                                },
                                {
                                    amount: 2500, // Fallback USD roughly
                                    currency_code: "usd",
                                }
                            ],
                        },
                    ],
                    sales_channels: [
                        {
                            id: (await salesChannelModuleService.listSalesChannels())[0].id
                        }
                    ]
                },
            ],
        },
    })

    const product = products[0]
    logger.info(`Created Product: ${product.title} (${product.id})`)

    logger.info("Seeding Da'Zeagra Completed!")
}
