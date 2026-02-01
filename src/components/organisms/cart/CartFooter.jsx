import Button from '../../atoms/Button';
import Loader from '../../molecules/Loader';
import PayPalCheckout from '../../molecules/PayPalCheckout';
import { toast } from 'sonner';

export default function CartFooter({
    totalAmount,
    onBuyNow,
    isRegistering,
    isDisabled
}) {
    const handlePaymentSuccess = (details) => {
        // Handle direct PayPal success if needed
    };

    return (
        <footer className="mt-8 pt-8 border-t border-zinc-800 flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
                <div className="text-right w-full md:w-auto">
                    <span className="text-zinc-400 mr-4 text-sm uppercase tracking-wider font-medium">Total Estimado</span>
                    <span className="text-3xl font-bold text-white tracking-tight">
                        ${totalAmount.toFixed(2)}
                    </span>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <Button
                        variant="primary"
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-95 disabled:opacity-50"
                        onClick={onBuyNow}
                        disabled={isDisabled}
                    >
                        {isRegistering ? (
                            <Loader className="h-5 w-5 border-white" size="xs" />
                        ) : (
                            'Comprar ahora'
                        )}
                    </Button>

                    <div className="w-full md:w-64 opacity-50 grayscale pointer-events-none">
                        <PayPalCheckout
                            amount={totalAmount}
                            onSuccess={handlePaymentSuccess}
                            onError={(err) => toast.error('Error en el pago con PayPal')}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
