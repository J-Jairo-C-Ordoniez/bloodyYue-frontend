import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from '../atoms/Typography';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ abaut, work, content }) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(imageRef.current,
            { x: -50, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        );

        if (contentRef.current) {
            tl.fromTo(contentRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" },
                "-=0.8"
            );
        }

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="relative py-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
                <article ref={imageRef} className="w-full md:w-5/12 relative">
                    <div className="aspect-4/5 rounded-lg overflow-hidden relative group">
                        <Image
                            src={content}
                            alt="Profile"
                            width={600}
                            height={750}
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-gray-500 -z-10" />
                    <div className="absolute -top-6 -left-6 w-24 h-24 border-l border-t border-gray-500 -z-10" />
                </article>

                <article ref={contentRef} className="w-full md:w-7/12 space-y-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-4 block">
                            Sobre Mí
                        </span>
                        <Typography variant="h2" className="text-3xl md:text-5xl font-light text-white leading-tight">
                            Arte Digital
                        </Typography>
                    </div>

                    <Typography variant="p" className="text-lg text-gray-300 max-w-2xl font-light">
                        {abaut}
                    </Typography>

                    <div className="h-px w-20 bg-gray-500 my-8" />

                    <div>
                        <Typography variant="h4" className="text-xl font-medium text-white mb-3">
                            Enfoque
                        </Typography>
                        <Typography variant="p" className="text-lg text-gray-300 max-w-2xl font-light">
                            {work}
                        </Typography>
                    </div>

                    <div className="pt-4 flex gap-6">
                        <div className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
                            <Icon name="PenTool" size={20} />
                            <span className="text-sm tracking-wide uppercase">Illustration</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};
