"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Typography from "../atoms/Typography";
import Menu from "../molecules/Menu";
import gsap from "gsap";

export default function HeaderSection({ title }) {
    const titleRef = useRef();

    useGSAP(() => {
        const letters = document.querySelectorAll(".title-letter");

        gsap.from(titleRef.current, {
            y: -10,
            duration: 1,
            ease: "power2.out",
            opacity: 0,
        });

        const hoverIn = () => {
            gsap.to(letters, {
                y: -6,
                rotate: (i) => i % 2 === 0 ? -3 : 3,
                duration: 0.4,
                stagger: {
                    each: 0.05,
                    from: "center"
                },
                ease: "power2.out"
            });
        };

        const hoverOut = () => {
            gsap.to(letters, {
                y: 0,
                rotate: 0,
                duration: 0.5,
                stagger: {
                    each: 0.02,
                    from: "edges"
                },
                ease: "power3.out"
            });
        };

        titleRef.current.addEventListener("mouseenter", hoverIn);
        titleRef.current.addEventListener("mouseleave", hoverOut);

        return () => {
            titleRef.current.removeEventListener("mouseenter", hoverIn);
            titleRef.current.removeEventListener("mouseleave", hoverOut);
        };
    }, { scope: titleRef });

    const menu = [
        { title: 'Sobre mí', href: '#about' },
        { title: 'Trabajos', href: '#works' },
        { title: 'Comisiones', href: '#commissions' },
        { title: 'Testimonios', href: '#testimonials' },
    ];

    return (    
        <header className="flex justify-center items-center sticky top-0 z-50 min-h-[10vh] md:px-10 lg:px-15 xl:px-20">
            <div className="flex justify-between items-center container mx-auto px-4">
                <div ref={titleRef} className="flex justify-between items-center py-4 interactive">
                    <Typography
                        variant="h1"
                        className="text-white title"
                    >
                        {title.split("").map((letter, index) => (
                            <span key={index} className="inline-block title-letter font-medium">
                                {letter}
                            </span>
                        ))}
                    </Typography>
                </div>

                <Menu links={menu} />
            </div>
        </header>
    );
}