import Image from '../atoms/Image';
import Typography from '../atoms/Typography';
import useCommissions from '../../hooks/useCommissions';

export default function CartItemSmall({ id, commissionId, quantity, status, priceAtMoment }) {
    const { commission, isLoadingCommission, errorCommission } = useCommissions({ commissionId }, 'getById');

    return (
        <article className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            {isLoadingCommission && <LoaderCard variant="list" />}
            {(errorCommission || commission?.error) && (
                <ErrorCard message={errorCommission || commission?.message || 'Error al cargar la comisión'} />
            )}
            {commission?.data && (
                <section data-id={id} className='flex items-center gap-3'>
                    <div className="h-10 w-10 relative rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                        <Image
                            src={commission?.data?.content}
                            alt={commission?.data?.title}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {commission?.data?.title}
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">
                            ${priceAtMoment}
                        </span>
                    </div>
                </section>
            )}
        </article>
    );
}
