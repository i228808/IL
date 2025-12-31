import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import {
    createRegionsWorkflow,
    createStockLocationsWorkflow,
    createShippingProfilesWorkflow,
    createShippingOptionsWorkflow,
    linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedPakistan({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const storeModuleService = container.resolve(Modules.STORE);
    const regionModuleService = container.resolve(Modules.REGION);
    const stockLocationService = container.resolve(Modules.STOCK_LOCATION);
    const link = container.resolve(ContainerRegistrationKeys.LINK);

    logger.info("Seeding Pakistan Shipping Data (Safe Mode)...");

    // 1. Get Default Sales Channel
    const [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels();

    // 2. Check Region
    let [region] = await regionModuleService.listRegions({ currency_code: "pkr" });
    if (!region) {
        logger.info("Region 'Pakistan' (PKR) not found, creating...");
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
        region = result[0];
        logger.info(`Created Region: ${region.id} `);
    } else {
        logger.info(`Region 'Pakistan' found: ${region.id} `);
    }

    // 3. Stock Location
    let [stockLocation] = await stockLocationService.listStockLocations({ name: "Karachi Warehouse" });
    if (!stockLocation) {
        logger.info("Stock Location 'Karachi Warehouse' not found, creating...");
        const { result } = await createStockLocationsWorkflow(container).run({
            input: {
                locations: [
                    {
                        name: "Karachi Warehouse",
                        address: {
                            city: "Karachi",
                            country_code: "PK",
                            address_1: "Warehouse 1",
                        },
                    },
                ],
            },
        });
        stockLocation = result[0];
        logger.info(`Created Stock Location: ${stockLocation.id} `);

        await linkSalesChannelsToStockLocationWorkflow(container).run({
            input: {
                id: stockLocation.id,
                add: [defaultSalesChannel.id],
            },
        });
    } else {
        logger.info(`Stock Location found: ${stockLocation.id} `);
    }

    // 4. Fulfillment Set
    let [fulfillmentSet] = await fulfillmentModuleService.listFulfillmentSets({ name: "Pakistan Delivery" });
    if (!fulfillmentSet) {
        logger.info("Fulfillment Set 'Pakistan Delivery' not found, creating...");
        fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
            name: "Pakistan Delivery",
            type: "shipping",
            service_zones: [
                {
                    name: "Pakistan",
                    geo_zones: [
                        {
                            country_code: "pk",
                            type: "country",
                        },
                    ],
                },
            ],
        });

        // Link everything
        await link.create({
            [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
            [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
        });

        try {
            await link.create({
                [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
                [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
            });
        } catch (e) {
            // Ignore
        }
        logger.info(`Created Fulfillment Set: ${fulfillmentSet.id} `);
    } else {
        logger.info(`Fulfillment Set found: ${fulfillmentSet.id} `);
    }

    // 5. Shipping Profile
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({ type: "default" });
    let shippingProfile = shippingProfiles[0];
    if (!shippingProfile) {
        const { result } = await createShippingProfilesWorkflow(container).run({
            input: { data: [{ name: "Default Profile", type: "default" }] }
        });
        shippingProfile = result[0];
    }

    // 6. Shipping Options
    logger.info("Creating/Ensuring Shipping Options...");
    try {
        await createShippingOptionsWorkflow(container).run({
            input: [
                {
                    name: "Standard Delivery",
                    price_type: "flat",
                    provider_id: "manual_manual",
                    service_zone_id: fulfillmentSet.service_zones[0].id,
                    shipping_profile_id: shippingProfile.id,
                    type: {
                        label: "Standard",
                        description: "Delivery in 3-5 days.",
                        code: "standard",
                    },
                    prices: [
                        {
                            currency_code: "pkr",
                            amount: 250,
                        },
                    ],
                    rules: [
                        {
                            attribute: "enabled_in_store",
                            value: "true",
                            operator: "eq"
                        },
                        {
                            attribute: "is_return",
                            value: "false",
                            operator: "eq"
                        }
                    ]
                },
                {
                    name: "Express Delivery",
                    price_type: "flat",
                    provider_id: "manual_manual",
                    service_zone_id: fulfillmentSet.service_zones[0].id,
                    shipping_profile_id: shippingProfile.id,
                    type: {
                        label: "Express",
                        description: "Delivery in 1-2 days.",
                        code: "express",
                    },
                    prices: [
                        {
                            currency_code: "pkr",
                            amount: 500,
                        },
                    ],
                    rules: [
                        {
                            attribute: "enabled_in_store",
                            value: "true",
                            operator: "eq"
                        },
                        {
                            attribute: "is_return",
                            value: "false",
                            operator: "eq"
                        }
                    ]
                },
            ],
        });
        logger.info("Created Shipping Options");
    } catch (e) {
        logger.error("Error creating shipping options: " + e.message);
    }

    logger.info("Seeding Pakistan Completed!");
}

