import useTestimonies from "../../hooks/useTestimonies";
import TestimonyCard from "../molecules/TestimonyCard";
import Typography from "../atoms/Typography";
import LoaderCard from "../molecules/LoaderCard";
import ErrorCard from "../molecules/ErrorCard";

export default function TestimonialsSection() {
    const { testimonies, loading, error } = useTestimonies();
    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-[#0B0B0E]">
            <header className="text-center mb-16 relative">
                <Typography variant="h3" className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                    Que Dicen <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-b from-gray-500 to-white">
                        Los Clientes
                    </span>
                </Typography>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {loading && (
                    <>
                        <LoaderCard variant="card" />
                        <LoaderCard variant="card" />
                        <LoaderCard variant="card" />
                    </>
                )}
                {error && (
                    <div className="col-span-full mx-auto">
                        <ErrorCard message={error} variant="default" />
                    </div>
                )}
                {!loading && !error && testimonies && testimonies.map((item, index) => {
                    const isWide = index % 5 === 1 || index % 5 === 4;
                    return (
                        <div
                            key={item.id || index}
                            className={`transition-all duration-500 delay-[${index * 100}ms] ${isWide ? "md:col-span-2" : "md:col-span-1"}`}
                        >
                            <TestimonyCard
                                testimonyId={item.id}
                                userId={item.userId}
                                message={item.message}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}