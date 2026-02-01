"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Typography from "../atoms/Typography";
import Link from "../atoms/Link";
import Menu from "../molecules/Menu";
import gsap from "gsap";

export default function HeaderSection({ title }) {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".title", {
            opacity: 0,
            y: 50,
            duration: 1
        });
        tl.from(".menu", {
            opacity: 0,
            y: 50,
            duration: 1
        });
        tl.from(".links", {
            opacity: 0,
            y: 50,
            duration: 1
        });
    }, { scope: container });

    const menu = [
        { title: 'Sobre mí', href: '#about' },
        { title: 'Trabajos', href: '#works' },
        { title: 'Comisiones', href: '#commissions' },
        { title: 'Testimonios', href: '#testimonials' },
    ];

    return (
        <header ref={container} className="flex justify-center items-center min-h-[10vh]">
            <div className="flex justify-between items-center container mx-auto px-4">
                <div className="flex justify-between items-center py-4 interactive">
                    <Typography
                        variant="h1"
                        className="text-white title"
                    >
                        {title}
                    </Typography>
                </div>

                <Menu links={menu} />

                <div className="flex gap-4 links">
                    <Link href="/users/login" variant="secondary">Acceder</Link>
                    <Link href="/users/register" variant="primary">Registrarse</Link>
                </div>
            </div>
        </header>
    );
}