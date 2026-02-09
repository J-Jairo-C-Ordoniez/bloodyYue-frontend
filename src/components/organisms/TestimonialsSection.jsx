import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useTestimonies from "../../hooks/useTestimonies";
import TestimonyCard from "../molecules/TestimonyCard";
import Typography from "../atoms/Typography";
import LoaderCard from "../molecules/LoaderCard";
import ErrorCard from "../molecules/ErrorCard";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
    const { testimonies, loading, error } = useTestimonies();
    const containerRef = useRef(null);

    useGSAP(() => {
        if (loading || !testimonies || testimonies.length === 0) return;

        // Header animation
        gsap.from(".testimonial-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Cards batch animation
        ScrollTrigger.batch(".testimonial-card", {
            onEnter: batch => gsap.from(batch, {
                y: 50,
                opacity: 0,
                scale: 0.9,
                stagger: 0.15,
                duration: 0.8,
                ease: "back.out(1.5)", // bouncy effect for testimonials
                overwrite: true
            }),
            start: "top 90%",
            once: true
        });

    }, { scope: containerRef, dependencies: [testimonies, loading] });

    return (
        <section ref={containerRef} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <header className="text-center mb-16 relative testimonial-header">
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
                            className={`testimonial-card opacity-0 ${isWide ? "md:col-span-2" : "md:col-span-1"}`}
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