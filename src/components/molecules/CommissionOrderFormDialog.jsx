import { useState, useEffect } from 'react';
import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';

export default function CommissionOrderFormDialog({ isOpen, onClose, commissionId, title, price, onSubmit, isLoading }) {
    const [quantity, setQuantity] = useState(1);
    const [details, setDetails] = useState('');

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setDetails('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            commissionId,
            quantity: parseInt(quantity),
            priceAtMoment: price,
            details
        });
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title={`Ordenar: ${title}`} className="bg-[#121212] m-auto!">
            <form onSubmit={handleSubmit} className="space-y-6 p-2">
                <div className="space-y-4">
                    {/* Read-only info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Commission ID</label>
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded px-3 py-2 text-zinc-500 text-sm truncate">
                                {commissionId}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Price per Unit</label>
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded px-3 py-2 text-zinc-200 font-semibold text-sm">
                                ${price}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Input
                            label="Cantidad"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            placeholder="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                            Detalles / Agregados
                        </label>
                        <textarea
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 min-h-[120px] resize-y"
                            placeholder="Describe los detalles específicos para tu pedido (ej. colores, referencias, tamaño específico...)"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Button variant="ghost" type="button" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Icon name="Loader2" size={18} className="animate-spin" />
                                Añadiendo...
                            </span>
                        ) : 'Confirmar Pedido'}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
