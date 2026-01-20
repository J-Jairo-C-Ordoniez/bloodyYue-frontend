import SectionHeader from '../molecules/SectionHeader';
import CommissionApp from './CommissionApp';

export default function CommisionSection() {
    return (
        <section className="py-20 px-4 bg-[#0B0B0E]">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="Comisiones"
                    subtitle="Proyectos y experiencia profesional."
                    align="center"
                    className="mb-12"
                />

                <CommissionApp />
            </div>
        </section>
    );
}
