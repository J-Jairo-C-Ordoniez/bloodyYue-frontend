import { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from '../atoms/Typography';
import Image from '../atoms/Image';
import Button from '../atoms/Button';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ abaut, work, content }) {
    const containerRef = useRef(null);
    const pathRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const titleLine1Ref = useRef(null);
    const titleLine2Ref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        // Title Animation
        tl.from(titleLine1Ref.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
            .from(titleLine2Ref.current, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "<0.2");

        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                }
            });
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="relative py-20 px-4 overflow-hidden">
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    ref={pathRef}
                    d="M0,0 C30,20 20,80 100,100"
                    stroke="#FF0000"
                    strokeWidth="0.5"
                    fill="none"
                    className="opacity-60"
                />
            </svg>

            <article className="container max-w-5xl mx-auto mb-20 relative z-10">
                <Typography variant="h2">
                    <div className="flex justify-end overflow-hidden">
                        <span ref={titleLine1Ref} className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-400">
                            Fantasia Oscura
                        </span>
                    </div>
                    <div className="flex justify-start overflow-hidden">
                        <span ref={titleLine2Ref} className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-400">
                            Arte Digital
                        </span>
                    </div>
                </Typography>
            </article>

            <div className="container w-full px-4 mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-10 relative z-10">
                <article className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl relative z-20">
                        <Image
                            src={content}
                            alt="Avatar"
                            width={400}
                            height={400}
                            variant="avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </article>

                <article className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left'>
                    <div className="about-text transition-all duration-500 ease-in-out">
                        <Typography variant="paragraph" className="text-lg text-slate-400 leading-relaxed mb-6">
                            {abaut}
                        </Typography>

                        <div className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Typography variant="paragraph" className="text-lg text-slate-400 leading-relaxed mt-4">
                                {work}
                            </Typography>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="cursor-pointer inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider"
                        >
                            {isExpanded ? 'Ver menos' : 'Trabajo'}
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};
