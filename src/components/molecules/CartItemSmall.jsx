import Image from '../atoms/Image';
import Typography from '../atoms/Typography';
import useCommissions from '../../hooks/useCommissions';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export default function CartItemSmall({ id, commissionId, quantity, priceAtMoment, onDiscard }) {
    const { commission, isLoadingCommission, errorCommission } = useCommissions({ id: commissionId }, 'getById');

    return (
        <article className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            {isLoadingCommission && <LoaderCard variant="list" />}
            {(errorCommission || commission?.error) && (
                <ErrorCard message={errorCommission || commission?.message || 'Error al cargar la comisión'} />
            )}
            {commission?.data && (
                <section data-id={id} className="w-full flex items-center justify-between gap-3">
                    <article className="flex items-center gap-3">
                        <div className="h-10 w-10 relative rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                            <Image
                                src={commission?.data?.content}
                                alt={commission?.data?.title}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <Typography variant="body" className="text-sm font-semibold text-zinc-100 truncate uppercase">
                                {commission?.data?.title}
                            </Typography>
                            <Typography variant="body" className="text-xs text-zinc-500 font-medium">
                                ${priceAtMoment} - CANTIDAD: {quantity}
                            </Typography>
                        </div>
                    </article>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDiscard(id);
                            }}
                        >
                            <Icon name="Trash" size={18} />
                        </Button>
                    </div>
                </section>
            )}
        </article>
    );
}
