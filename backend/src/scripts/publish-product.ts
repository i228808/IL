import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function publishProduct({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const productModule = container.resolve(Modules.PRODUCT)

    logger.info("--- PUBLISHING PRODUCT ---")

    const [product] = await productModule.listProducts({ handle: "dazeagra-herbal-oil" })

    if (!product) {
        logger.error("PRODUCT NOT FOUND")
        return
    }

    await productModule.updateProducts(product.id, {
        status: "published"
    })

    logger.info(`Product ${product.title} (${product.id}) updated to PUBLISHED status.`)
    logger.info("--- DONE ---")
}
