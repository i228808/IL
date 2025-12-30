
"use client"

import { Button } from "@medusajs/ui"
import { placeOrder } from "@lib/data/cart"
import React, { useEffect, useState } from "react"
import ErrorMessage from "../error-message"

type SafepayButtonProps = {
    cart: any
    notReady: boolean
    "data-testid": string
}

const SafepayPaymentButton: React.FC<SafepayButtonProps> = ({
    cart,
    notReady,
    "data-testid": dataTestId,
}) => {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        // Load Safepay Script dynamically
        const script = document.createElement("script")
        script.src = "https://storage.googleapis.com/safepayobjects/api/safepay-checkout.min.js"
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handlePayment = async () => {
        setSubmitting(true)
        setErrorMessage(null)

        // Extensive debugging to find the SDK
        const allKeys = Object.keys(window)
        const safepayKeys = allKeys.filter(k => k.toLowerCase().includes("safe"))
        console.log("Global keys matching 'safe':", safepayKeys)

        safepayKeys.forEach(key => {
            console.log(`Contents of window.${key}:`, (window as any)[key])
        })

        const safepay = (window as any).safepay || (window as any).Safepay

        if (!safepay) {
            setErrorMessage("Safepay SDK not loaded. Please refresh.")
            setSubmitting(false)
            return
        }

        // Deep inspection of the Safepay object to find the correct API
        const renderSafepay = () => {
            console.log("--- Safepay SDK Inspection ---");
            const sp = (window as any).safepay;
            console.log("typeof safepay:", typeof sp);

            if (typeof sp === 'object') {
                console.log("safepay keys:", Object.keys(sp));

                for (const key of Object.keys(sp)) {
                    try {
                        const val = sp[key];
                        console.log(`safepay.${key} type:`, typeof val);
                        if (typeof val === 'object' && val !== null) {
                            console.log(`safepay.${key} keys:`, Object.keys(val));
                        }
                    } catch (e) {
                        console.log(`Error inspecting safepay.${key}`, e);
                    }
                }

                // Check specifically for Checkout or Button
                if (sp.Checkout) {
                    console.log("safepay.Checkout detected. Type:", typeof sp.Checkout);
                    if (typeof sp.Checkout === 'object') {
                        console.log("safepay.Checkout keys:", Object.keys(sp.Checkout));
                    }
                }
                if (sp.Button) {
                    console.log("safepay.Button detected. Type:", typeof sp.Button);
                    if (typeof sp.Button === 'object') {
                        console.log("safepay.Button keys:", Object.keys(sp.Button));
                    }
                }
            }

            setErrorMessage("Check console for SDK structure. Please copy logs.");
            setSubmitting(false);
        }

        try {
            renderSafepay()
        } catch (e: any) {
            console.error("Safepay Render Error:", e)
            setErrorMessage(`Error initializing Safepay: ${e.message}`)
            setSubmitting(false)
        }
    }

    return (
        <>
            <div id="safepay-button-container" onClick={handlePayment} className="w-full h-12 bg-ui-button-neutral hover:bg-ui-button-neutral-hover rounded-md flex items-center justify-center cursor-pointer">
                <span className="text-small-regular text-ui-fg-base">Pay with Safepay</span>
            </div>
            <ErrorMessage
                error={errorMessage}
                data-testid="safepay-payment-error-message"
            />
        </>
    )
}

export default SafepayPaymentButton
