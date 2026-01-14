import CommissionCard from '../molecules/CommissionCard';
import useCommissions from '../../hooks/useCommissions';
import SectionHeader from '../molecules/SectionHeader';

export default function CommisionSection() {
    const { commission, isLoadingCommission, errorCommission } = useCommissions({ id: 0 }, 'list');

    return (
        <section id="commission" className="py-24 bg-foreground dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Comisiones"
                        subtitle="Diseño exclusivo y solicitudes personalizadas. Crea tu estilo único con nuestros productos de alta calidad."
                        align="center"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {commission?.data && commission?.data.map((item) => (
                            <CommissionCard
                                key={item.commissionId}
                                title={item.title}
                                price={item.price}
                                content={item.content}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
