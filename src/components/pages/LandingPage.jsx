import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeaderSection from '../organisms/HeaderSection';
import HeroSection from '../organisms/HeroSection';
import AboutSection from '../organisms/AboutSection';
import WorkSection from '../organisms/WorkSection';
import CommissionsSection from '../organisms/CommissionsSection';
import TestimonialsSection from '../organisms/TestimonialsSection';
import Footer from '../organisms/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ data }) {
    const mainRef = useRef(null);
    const sectionsRef = useRef([]);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    if (!data) return null;

    const {
        settingId,
        title,
        subtitle,
        contentHero,
        abaut,
        work,
        email,
        redes
    } = data;

    useGSAP(() => {
        const sections = sectionsRef.current;

        sections.forEach((section, index) => {
            if (index > 0) {
                gsap.fromTo(section,
                    {
                        y: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1
                        }
                    }
                );
            }
        });

    }, { scope: mainRef });

    return (
        <div ref={mainRef} className="bg-[#0B0B0F] text-white overflow-hidden">
            <HeaderSection title={title} />

            <main data-id={settingId} className="min-h-screen relative">
                <div ref={addToRefs} className="relative z-10">
                    <HeroSection
                        subtitle={subtitle}
                        abaut={abaut}
                    />
                </div>

                <div ref={addToRefs} className="relative z-20 -mt-10">
                    <AboutSection
                        abaut={abaut}
                        work={work}
                        content={contentHero}
                    />
                </div>

                <div ref={addToRefs} className="relative z-30">
                    <WorkSection />
                </div>

                <div ref={addToRefs} className="relative z-30">
                    <CommissionsSection />
                </div>

                <div ref={addToRefs} className="relative z-40">
                    <TestimonialsSection />
                </div>
            </main>

            <div className="relative z-50">
                <Footer email={email} redes={redes} />
            </div>
        </div>
    );
};
