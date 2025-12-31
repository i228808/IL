import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createRegionsWorkflow, createTaxRegionsWorkflow, createPricesWorkflow } from "@medusajs/medusa/core-flows";

export default async function addPkrData({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const regionModuleService = container.resolve(Modules.REGION);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    logger.info("Initializing PKR Setup...");

    // 1. Create Region for PKR
    const regions = await regionModuleService.listRegions({ currency_code: "pkr" });
    let pkrRegion = regions[0];

    if (!pkrRegion) {
        logger.info("Creating PKR Region...");
        const { result } = await createRegionsWorkflow(container).run({
            input: {
                regions: [
                    {
                        name: "Pakistan",
                        currency_code: "pkr",
                        countries: ["pk"],
                        payment_providers: ["pp_system_default"],
                    },
                ],
            },
        });
        pkrRegion = result[0];

        // Add Tax Region for PK
        await createTaxRegionsWorkflow(container).run({
            input: [{
                country_code: "pk",
                provider_id: "tp_system",
            }],
        });
        logger.info("PKR Region Created.");
    } else {
        logger.info("PKR Region already exists.");
    }

    // 2. Add Prices to Products
    logger.info("Fetching products and prices...");

    // Use Query to fetch products with variants and their prices
    const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "variants.id", "variants.price_set.id", "variants.prices.*"],
    });

    logger.info(`Found ${products.length} products to update.`);

    for (const product of products) {
        if (!product.variants) continue;

        for (const variant of product.variants) {
            // Check if price already exists
            const hasPkrPrice = variant.prices?.some((p: any) => p.currency_code === "pkr");

            if (!hasPkrPrice) {
                if (!variant.price_set?.id) {
                    logger.warn(`Variant ${variant.id} has no price_set. Skipping.`);
                    continue;
                }

                logger.info(`Adding PKR price to variant ${variant.id} (Price Set: ${variant.price_set.id})`);

                await createPricesWorkflow(container).run({
                    input: {
                        prices: [{
                            price_set_id: variant.price_set.id,
                            currency_code: "pkr",
                            amount: 3000,
                        }]
                    }
                });
            }
        }
    }

    logger.info("Finished adding PKR prices.");
}
