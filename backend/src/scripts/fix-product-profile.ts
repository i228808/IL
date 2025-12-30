
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";

export default async function fixProductProfile({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
    const productModuleService = container.resolve(Modules.PRODUCT);

    logger.info("FIXING PRODUCT PROFILE...");

    // 1. Get Profile
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({ type: "default" });
    if (!shippingProfiles.length) {
        logger.error("No default shipping profile found!");
        return;
    }
    const defaultProfile = shippingProfiles[0];
    logger.info(`Using Profile: ${defaultProfile.id}`);

    // 2. Get Product
    const [product] = await productModuleService.listProducts({ handle: "dazeagra-herbal-oil" });
    if (!product) {
        logger.error("Product NOT found!");
        return;
    }
    logger.info(`Updating Product: ${product.title} (${product.id})`);

    // 3. Update Product via Workflow
    await updateProductsWorkflow(container).run({
        input: {
            products: [
                {
                    id: product.id,
                    shipping_profile_id: defaultProfile.id
                }
            ]
        }
    });

    logger.info("Product updated successfully!");
}
