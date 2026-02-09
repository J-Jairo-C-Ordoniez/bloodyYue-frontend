import { useState, useRef, useEffect } from "react";
import Icon from "../atoms/Icon";
import Link from "../atoms/Link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Menu({ links }) {
    const btnRef = useRef();
    const containerRef = useRef();
    const [open, setOpen] = useState(false);

    useGSAP(() => {
        gsap.from(btnRef.current, {
            y: -10,
            duration: 1,
            ease: "power2.out",
            opacity: 0,
        });
    }, { scope: btnRef });

    useEffect(() => {
        const cards = containerRef.current?.children || [];

        if (!open) return;

        gsap.from(cards, {
            y: "100vh",
            x: 40,
            duration: 0.6,
            rotate: 20,
            ease: "power2.out",
            opacity: 0,
            stagger: {
                each: 0.1,
                from: "start"
            }
        });
    }, [open]);

    return (
        <div className="flex gap-2">
            <Link
                variant="primary"
                href="#commissions"
                className="rounded-full px-8 py-4 text-lg shadow-lg shadow-indigo-500/30"
            >
                Solicitar Comisión
            </Link>

            <button
                ref={btnRef}
                className="flex items-center gap-2 bg-zinc-900 py-3 px-4 rounded-full hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <span className="text-white">
                    {open ? 'Cerrar' : ' Menu'}
                </span>
                <Icon name="ListMinus" />
            </button>

            {open &&
                <nav ref={containerRef} className="absolute top-22 right-10 z-99999 space-y-4">
                    <ul className="flex flex-col gap-2 bg-zinc-900 py-3 px-4 rounded-2xl">
                        {links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} variant="default">{item.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-2 bg-zinc-900 py-3 px-4 rounded-2xl">
                        <Link href="/users/login" variant="secondary">Acceder</Link>
                        <Link href="/users/register" variant="primary">Registrarse</Link>
                    </div>
                </nav>
            }
        </div>
    );
}
