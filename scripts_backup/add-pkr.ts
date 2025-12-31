import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { updateStoresStep } from "@medusajs/medusa/core-flows";
import { createWorkflow, transform, WorkflowResponse } from "@medusajs/framework/workflows-sdk";

const updateStoreCurrencies = createWorkflow(
    "update-store-currencies-pkr",
    (input: {
        supported_currencies: { currency_code: string; is_default?: boolean }[];
        store_id: string;
    }) => {
        const normalizedInput = transform({ input }, (data) => {
            return {
                selector: { id: data.input.store_id },
                update: {
                    supported_currencies: data.input.supported_currencies.map(
                        (currency) => {
                            return {
                                currency_code: currency.currency_code,
                                is_default: currency.is_default ?? false,
                            };
                        }
                    ),
                },
            };
        });

        const stores = updateStoresStep(normalizedInput);

        return new WorkflowResponse(stores);
    }
);

export default async function addPkrCurrency({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const storeModuleService = container.resolve(Modules.STORE);

    const [store] = await storeModuleService.listStores();

    logger.info("Adding PKR to store currencies...");

    await updateStoreCurrencies(container).run({
        input: {
            store_id: store.id,
            supported_currencies: [
                {
                    currency_code: "eur",
                    is_default: true,
                },
                {
                    currency_code: "usd",
                },
                {
                    currency_code: "pkr",
                },
            ],
        },
    });

    logger.info("Successfully added PKR currency.");
}
