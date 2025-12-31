import {
    AbstractNotificationProviderService,
    MedusaError
} from "@medusajs/framework/utils"
import {
    Logger,
    ProviderSendNotificationDTO,
    ProviderSendNotificationResultsDTO
} from "@medusajs/framework/types"
import axios from "axios"

type BrevoOptions = {
    apiKey: string
    fromEmail: string
    fromName?: string
}

type InjectedDependencies = {
    logger: Logger
}

export class BrevoNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "brevo"
    protected logger_: Logger
    protected options_: BrevoOptions

    constructor(container: InjectedDependencies, options: BrevoOptions) {
        super()
        this.logger_ = container.logger
        this.options_ = options
    }

    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        if (!this.options_.apiKey) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Brevo API key is missing. Please set BREVO_API_KEY."
            )
        }

        const { to, template, data } = notification

        // Use require as explicitly requested to handle the legacy SDK correctly
        // @ts-ignore
        const SibApiV3Sdk = require("sib-api-v3-sdk")
        const defaultClient = SibApiV3Sdk.ApiClient.instance

        // Configure API key authorization: api-key
        const apiKey = defaultClient.authentications['api-key']
        apiKey.apiKey = this.options_.apiKey

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

        // Create the email data
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
        sendSmtpEmail.to = [{ email: to }]
        sendSmtpEmail.sender = {
            name: this.options_.fromName || "Store",
            email: this.options_.fromEmail
        }
        sendSmtpEmail.subject = data?.subject || "Order Notification"

        // If html content is provided, use it. Otherwise use generic content.
        sendSmtpEmail.htmlContent = data?.htmlContent || `<p>Notification: ${template}</p>`

        try {
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
            this.logger_.info(`Brevo email sent successfully. ID: ${JSON.stringify(data)}`)
            return { id: "brevo-sent" }
        } catch (error: any) {
            this.logger_.error(
                `Brevo send failed: ${error.message}`
            )
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                `Brevo email send failed: ${error.message}`
            )
        }
    }
}

export default BrevoNotificationProviderService
