import useCommissions from '../../hooks/useCommissions';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Label from '../atoms/Label';

export default function CommissionDetailsDialog({ commissionId, isOpen, onClose, onAddToCart, isLoading }) {
    const { commission, isLoadingCommission, errorCommission, } = useCommissions({ id: commissionId }, 'getById');

    return (
        <Dialog isOpen={isOpen} onClose={onClose} className="bg-[#121212] m-auto! max-h-[90vh] flex flex-col">
            <div className="flex flex-col items-center text-center space-y-6">
                {isLoadingCommission && (
                    <LoaderCard variant="card" />
                )}

                {errorCommission || commission?.error && (
                    <div className="col-span-full">
                        <ErrorCard message={commission?.message || errorCommission} variant="default" />
                    </div>
                )}

                {!isLoadingCommission && !errorCommission && commission?.data && (
                    <>
                        <div className="w-full max-w-md rounded-xl overflow-hidden flex justify-center p-4">
                            <Image
                                src={commission?.data.content}
                                alt={commission?.data.title}
                                width={500}
                                height={500}
                                className="object-contain max-h-[40vh]"
                            />
                        </div>

                        {commission?.data.labels && (
                            <div className="flex items-center gap-2">
                                {commission?.data.labels.map((label) => (
                                    <Label key={label.labelId} color={label.color}>
                                        {label.name}
                                    </Label>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4 w-full text-left">
                            <div>
                                <Typography
                                    variant="title"
                                    className="text-2xl font-bold mb-2 text-white"
                                >
                                    {commission?.data.title}
                                </Typography>
                                <Typography
                                    variant="subtitle"
                                    className="text-2xl font-bold mb-2 text-zinc-400"
                                >
                                    ${commission?.data.price}
                                </Typography>
                                <Typography
                                    variant="body"
                                    className="text-zinc-500 leading-relaxed"
                                >
                                    {commission?.data.description || "Sin descripción disponible."}
                                </Typography>
                                {commission?.data.terms && (
                                    <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg text-sm">
                                        <Typography variant="small" className="font-bold text-zinc-200 mb-1">Términos:</Typography>
                                        <Typography variant="body" className="text-zinc-400">{commission?.data.terms}</Typography>
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="primary"
                                className="max-w-sm mx-auto"
                                onClick={onAddToCart}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2 justify-center">
                                        <Icon name="Loader2" size={18} className="animate-spin" />
                                        Procesando...
                                    </span>
                                ) : 'Añadir al carrito'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    );
}
