import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import LoaderCard from "./LoaderCard";

const initialOptions = {
    "client-id": "test", // Sandbox/Test Client ID
    currency: "USD",
    intent: "capture",
};

export default function PayPalCheckout({ amount, onSuccess, onError }) {
    const [isPending, setIsPending] = useState(false);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amount.toString(),
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        try {
            setIsPending(true);
            const details = await actions.order.capture();
            await onSuccess(details);
        } catch (error) {
            toast.error("Error al procesar el pago");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            {isPending && <LoaderCard variant="text" />}
            <div className="z-0 relative">
                <PayPalButtons
                    style={{ layout: "horizontal", color: "gold", shape: "rect", label: "pay" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={(err) => onError && onError(err)}
                />
            </div>
        </PayPalScriptProvider>
    );
}
