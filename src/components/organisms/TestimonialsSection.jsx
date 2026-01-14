import useTestimonies from "../../hooks/useTestimonies";
import TestimonyCard from "../molecules/TestimonyCard";
import Typography from "../atoms/Typography";

export default function TestimonialsSection() {
    const { testimony, isLoadingTestimony, errorTestimony } = useTestimonies();
    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <header className="text-center mb-16 relative">
                <Typography variant="h3" className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                   Que Dicen <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-b from-gray-500 to-white">
                        Los Clientes
                    </span>
                </Typography>
                <div className="absolute top-0 right-1/4 translate-x-12 -translate-y-4 md:translate-x-24 md:-translate-y-8 text-6xl md:text-8xl animate-pulse">
                    😍
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {testimony?.data && testimony?.data?.map((item, index) => (
                    <div key={item.id || index} className={index === 1 || index === 4 || index === 5 ? "md:col-span-2" : "md:col-span-1"}>
                        <TestimonyCard
                            testimonyId={item.id}
                            userId={item.userId}
                            message={item.message}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}