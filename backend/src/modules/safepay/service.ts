import {
    AbstractPaymentProvider,
    PaymentSessionStatus,
    MedusaError
} from "@medusajs/framework/utils"
import {
    Logger,
    ProviderWebhookPayload,
    WebhookActionResult
} from "@medusajs/framework/types"
import axios from "axios"

type Options = {
    apiKey: string
    secretKey: string
    sandbox?: boolean
}

type InjectedDependencies = {
    logger: Logger
}

export class SafepayPaymentProviderService extends AbstractPaymentProvider {
    static identifier = "safepay"
    protected logger_: Logger
    protected options_: Options

    constructor(container: InjectedDependencies, options: Options) {
        super(container, options)
        this.logger_ = container.logger
        this.options_ = options
    }

    async initiatePayment(input: any): Promise<any> {
        this.logger_.info("Safepay: Initiate Payment")

        const { currency_code, amount } = input

        // Ensure we have the necessary keys
        if (!this.options_.apiKey || !this.options_.secretKey) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Safepay API Key or Secret Key is missing"
            )
        }

        const url = this.options_.sandbox
            ? "https://sandbox.api.getsafepay.com/order/v1/init"
            : "https://api.getsafepay.com/order/v1/init"

        try {
            // Call Safepay API to initialize payment
            const response = await axios.post(
                url,
                {
                    merchant_api_key: this.options_.apiKey,
                    intent: "CYBERSOURCE",
                    mode: "payment",
                    currency: currency_code.toUpperCase(),
                    amount: amount // Amount is typically in cents (or lowest unit) - verifying Safepay expects this format
                },
                {
                    headers: {
                        "X-SFPY-MERCHANT-SECRET": this.options_.secretKey
                    }
                }
            )

            const { data } = response.data
            this.logger_.info(`Safepay: Created tracker ${data.token}`)

            return {
                ...input,
                id: data.token, // Store the token as the session ID or in data
                tracker: data.token,
                status: "pending"
            }
        } catch (error: any) {
            this.logger_.error(
                `Safepay: Payment initiation failed - ${error.message} - ${JSON.stringify(error.response?.data)}`
            )
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                `Safepay payment initiation failed: ${error.message}`
            )
        }
    }

    async authorizePayment(input: any): Promise<any> {
        this.logger_.info("Safepay: Authorize Payment")
        return {
            status: PaymentSessionStatus.AUTHORIZED,
            data: {
                ...input,
            }
        }
    }

    async cancelPayment(input: any): Promise<any> {
        return input
    }

    async capturePayment(input: any): Promise<any> {
        return {
            ...input,
            status: "captured"
        }
    }

    async deletePayment(input: any): Promise<any> {
        return input
    }

    async getPaymentStatus(input: any): Promise<any> {
        return PaymentSessionStatus.AUTHORIZED
    }

    async refundPayment(input: any): Promise<any> {
        return input
    }

    async retrievePayment(input: any): Promise<any> {
        return input
    }

    async updatePayment(input: any): Promise<any> {
        return input
    }

    async getWebhookActionAndData(data: any): Promise<any> {
        return { action: "not_supported" }
    }
}

export default SafepayPaymentProviderService;

