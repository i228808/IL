import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import * as fs from "fs";

// Helper to append to log file
function logToFile(message: string) {
    fs.appendFileSync("verification_result.txt", message + "\n");
}

export default async function verifyPakistan({ container }: ExecArgs) {
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
    const productModuleService = container.resolve(Modules.PRODUCT);

    // Clear file
    fs.writeFileSync("verification_result.txt", "VERIFICATION START\n");

    logToFile("VERIFYING PAKISTAN SETUP...");

    // 1. Check Product Profile
    const [product] = await productModuleService.listProducts({ handle: "dazeagra-herbal-oil" });
    if (!product) {
        logToFile("Product NOT found!");
        return;
    }
    logToFile(`Product: ${product.title}, Profile ID: ${product.shipping_profile_id}`);

    // 2. Check Shipping Options
    const shippingOptions = await fulfillmentModuleService.listShippingOptions();
    logToFile(`Total Shipping Options: ${shippingOptions.length}`);

    for (const option of shippingOptions) {
        logToFile(`Option: ${option.name}, Profile ID: ${option.shipping_profile_id}, Price Type: ${option.price_type}`);
        if (option.shipping_profile_id !== product.shipping_profile_id) {
            logToFile(`  -> MISMATCH: Option ${option.name} has profile ${option.shipping_profile_id} but product has ${product.shipping_profile_id}`);
        } else {
            logToFile(`  -> MATCH!`);
        }

        // Check Rules
        // Rules are harder to list directly on the option object depending on hydration depth
        // But we can check service zone
        logToFile(`  -> Service Zone: ${option.service_zone_id}`);
    }

    // 3. Check Fulfillment Sets linkage
    const fulfillmentSets = await fulfillmentModuleService.listFulfillmentSets({ name: "Pakistan Delivery" }, { relations: ["service_zones", "service_zones.geo_zones"] });
    if (fulfillmentSets.length) {
        logToFile(`Fulfillment Set 'Pakistan Delivery' found. ID: ${fulfillmentSets[0].id}`);
        logToFile(`  -> Service Zones: ${fulfillmentSets[0].service_zones.length}`);
        fulfillmentSets[0].service_zones.forEach(sz => {
            logToFile(`    -> SZ: ${sz.name} (${sz.id})`);
            sz.geo_zones.forEach(gz => logToFile(`      -> GZ: ${gz.country_code} (${gz.type})`));
        });
    } else {
        logToFile("Fulfillment Set 'Pakistan Delivery' NOT found!");
    }

}
