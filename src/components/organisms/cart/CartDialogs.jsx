import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '../../molecules/Dialog';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Loader from '../../molecules/Loader';

export default function CartDialogs({
    confirmOpen,
    setConfirmOpen,
    eduOpen,
    setEduOpen,
    onCancelSale,
    onContinueToPayment,
    onSimulatePayment,
    isProcessing
}) {
    return (
        <>
            {/* Diálogo de Confirmación */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Confirmar Compra</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Se han registrado tus items para la compra. ¿Deseas continuar con el pago o cancelar el proceso?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 gap-3">
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={onCancelSale} disabled={isProcessing}>
                            Cancelar
                        </Button>
                        <Button variant="primary" className="bg-purple-600 hover:bg-purple-500" onClick={onContinueToPayment} disabled={isProcessing}>
                            Continuar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Diálogo Educativo / Simulación PayPal */}
            <Dialog open={eduOpen} onOpenChange={setEduOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Icon name="Info" className="text-blue-400" />
                            Proyecto Educativo
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Este es un proyecto educativo y la opción de pago real vía PayPal no está disponible en este momento.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-4">
                        <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg text-sm text-blue-200">
                            Sin embargo, puedes simular el flujo completo de la plataforma haciendo clic en el botón de abajo. Esto marcará tu compra como <strong>pagada</strong> en el sistema.
                        </div>

                        {/* Simulación de PayPal desactivada */}
                        <div className="opacity-30 grayscale pointer-events-none">
                            <div className="bg-[#ffc439] h-10 rounded-md flex items-center justify-center font-bold text-[#003087] italic">
                                PayPal
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="primary"
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold"
                            onClick={onSimulatePayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? <Loader className="border-white" size="xs" /> : 'Pagar para simular compra'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
