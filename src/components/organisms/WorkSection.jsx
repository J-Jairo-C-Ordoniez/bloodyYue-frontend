import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from '../molecules/SectionHeader';
import usePosts from '../../hooks/usePosts';
import WorkCard from '../molecules/WorkCard';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard'; 

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
    const { posts, loading, error } = usePosts();
    const containerRef = useRef(null);

    useGSAP(() => {
        if (loading || !posts || posts.length === 0) return;

        gsap.fromTo(".work-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            skewY: 5,
            duration: 1,
            ease: "power2.out"
        }, {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1,
            ease: "power2.out"
        });

        ScrollTrigger.batch(".work-card-container", {
            onEnter: batch => gsap.fromTo(batch,
                {
                    y: 100,
                    opacity: 0,
                    rotationX: 15,
                    scale: 0.9,
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    scale: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out",
                    overwrite: true
                }),
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        });

        const cards = gsap.utils.toArray(".work-card-container");
        cards.forEach(card => {
            const content = card.querySelector('.work-card-content');

            if (!content) return;

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                gsap.to(content, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    scale: 1.02,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(content, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });

    }, { scope: containerRef, dependencies: [posts, loading] });

    return (
        <>
            <section ref={containerRef} id="works" className="py-20 px-4 perspective-1000 min-h-screen">
                <div className="container max-w-7xl mx-auto">
                    <div className="work-header">
                        <SectionHeader
                            title="Mí Trabajo"
                            subtitle="Proyectos y experiencia profesional."
                            align="left"
                            className="mb-12"
                        />
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {loading && (
                            <>
                                <LoaderCard variant="card" />
                                <LoaderCard variant="card" />
                                <LoaderCard variant="card" />
                            </>
                        )}

                        {error && (
                            <div className="col-span-full">
                                <ErrorCard message={error || 'Error al cargar los trabajos'} />
                            </div>
                        )}

                        {posts && posts.map((item) => (
                            <div key={item.postId} className="work-card-container opacity-0 perspective-1000">
                                <div className="work-card-content transform-style-3d h-full">
                                    <WorkCard
                                        postId={item.postId}
                                        userId={item.userId}
                                        title={item.title}
                                        description={item.description}
                                        content={item.content}
                                        typePost={item.typePost}
                                        createdAt={item.createdAt}
                                        labels={item.labels}
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </>
    );
};