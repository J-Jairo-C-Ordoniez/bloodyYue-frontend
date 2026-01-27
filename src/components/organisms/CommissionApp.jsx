import CommissionCard from '../molecules/CommissionCard';
import useCommissions from '../../hooks/useCommissions';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';

export default function CommissionApp() {
    const { commissions, loading, error } = useCommissions({ id: 0 }, 'list');

    return (
        <section id="commission" className="bg-[#0B0B0E]">
            <div className="container mx-auto px-4">
                <div className='grid gap-8 grid-cols-1 max-w-2xl mx-auto'>
                    {loading && (
                        <>
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                        </>
                    )}
                    {error && (
                        <div className="col-span-full">
                            <ErrorCard message={error} variant="default" />
                        </div>
                    )}
                    {!loading && !error && commissions && commissions.map((item) => (
                        <CommissionCard
                            key={item.commissionId}
                            commissionId={item.commissionId}
                            title={item.title}
                            price={item.price}
                            content={item.content}
                            status
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}