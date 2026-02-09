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

        // Animate header
        gsap.from(".work-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // Batch animation for cards as they enter
        ScrollTrigger.batch(".work-card", {
            onEnter: batch => gsap.from(batch, {
                y: 60,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true
            }),
            start: "top 90%",
            once: true // animate only once
        });

    }, { scope: containerRef, dependencies: [posts, loading] });

    return (
        <section ref={containerRef} id="works" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="work-header">
                    <SectionHeader
                        title="Mí Trabajo"
                        subtitle="Proyectos y experiencia profesional."
                        align="left"
                        className="mb-12"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                        <div key={item.postId} className="work-card opacity-0">
                            {/* opacity-0 to hide before animation starts, 
                                but simpler: let from() handle it. 
                                Actually, if JS is slow, they might flash. 
                                Better to keep them visible and let from() set opacity:0 immediately. 
                                Or use CSS to hide initially? 
                                GSAP from() sets initial state immediately.
                            */}
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
                    ))}
                </div>
            </div>
        </section>
    );
};