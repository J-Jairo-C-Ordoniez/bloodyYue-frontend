import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../molecules/SectionHeader";
import CommissionCard from "../molecules/CommissionCard";
import useCommissions from "../../hooks/useCommissions";
import LoaderCard from "../molecules/LoaderCard";
import ErrorCard from "../molecules/ErrorCard";

gsap.registerPlugin(ScrollTrigger);

export default function CommissionsSection() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const gridRef = useRef(null);
    const { commissions, loading, error } = useCommissions({}, 'list');

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top center",
                end: "bottom bottom",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(sectionRef.current,
            {
                clipPath: "inset(0 50% 0 50%)",
                autoAlpha: 0
            },
            {
                clipPath: "inset(0 0% 0 0%)",
                autoAlpha: 1,
                duration: 1.5,
                ease: "power4.inOut"
            }
        );

        if (gridRef.current) {
            tl.fromTo(gridRef.current.children, {
                y: 100,
                opacity: 0,
                scale: 0.8,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(1.7)",
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(1.7)",
            }, "-=0.5");
        }

    }, { scope: sectionRef, dependencies: [commissions] });

    return (
        <section
            id="commissions"
            ref={sectionRef}
            className="w-full relative z-10 px-4 pb-10 invisible"
        >
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="Comisiones"
                    subtitle="Solicita tu arte personalizado"
                    align="center"
                    className="mb-12"
                />

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading && (
                        <>
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                        </>
                    )}

                    {error && (
                        <div className="col-span-full">
                            <ErrorCard message={error} />
                        </div>
                    )}

                    {commissions && commissions.map((item) => (
                        <CommissionCard
                            key={item.commissionId}
                            commissionId={item.commissionId}
                            title={item.title}
                            price={item.price}
                            content={item.content}
                            status={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
