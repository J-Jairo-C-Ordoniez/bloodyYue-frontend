import useCommissions from '../../hooks/useCommissions';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './Dialog';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Label from '../atoms/Label';

export default function CommissionDetailsDialog({ commissionId, isOpen, onClose, onAddToCart, isLoading }) {
    const { commissions: commissionData, loading, error, } = useCommissions({ id: commissionId }, 'getById');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#121212] border-zinc-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white sr-only">{commissionData?.title || 'Detalles de Comisión'}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center text-center space-y-6">
                    {loading && (
                        <LoaderCard variant="card" />
                    )}

                    {error && (
                        <div className="col-span-full">
                            <ErrorCard message={error} variant="default" />
                        </div>
                    )}

                    {!loading && !error && commissionData && (
                        <>
                            <div className="w-full rounded-xl overflow-hidden flex justify-center p-4 bg-zinc-900/50">
                                <Image
                                    src={commissionData.content}
                                    alt={commissionData.title}
                                    width={500}
                                    height={500}
                                    className="object-contain max-h-[40vh]"
                                />
                            </div>

                            {commissionData.labels && (
                                <div className="flex items-center gap-2 flex-wrap justify-center">
                                    {commissionData.labels.map((label) => (
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
                                        {commissionData.title}
                                    </Typography>
                                    <div className="flex items-center justify-between mb-4">
                                        <Typography
                                            variant="subtitle"
                                            className="text-2xl font-bold text-purple-400"
                                        >
                                            ${commissionData.price}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="body"
                                        className="text-zinc-400 leading-relaxed"
                                    >
                                        {commissionData.description || "Sin descripción disponible."}
                                    </Typography>
                                    {commissionData.terms && (
                                        <div className="mt-4 p-4 bg-zinc-800/30 rounded-lg text-sm border border-zinc-800">
                                            <Typography variant="small" className="font-bold text-zinc-200 mb-1 uppercase tracking-wider">Términos:</Typography>
                                            <Typography variant="body" className="text-zinc-400">{commissionData.terms}</Typography>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full"
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
            </DialogContent>
        </Dialog>
    );
}
