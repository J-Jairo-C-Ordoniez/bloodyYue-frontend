"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from '../atoms/Icon';
import usePosts from '../../hooks/usePosts';
import PostRandom from '../molecules/PostRandom';
import ErrorCard from '../molecules/ErrorCard';
import Typography from '../atoms/Typography';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ subtitle }) {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const canvasRef = useRef(null);
    const { posts, error } = usePosts(null, 'random');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 2, 
                y: (e.clientY / window.innerHeight - 0.5) * 2
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 80;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5 + 0.1;
                this.density = (Math.random() * 30) + 1;
            }

            update(mouseX, mouseY) {
                const dx = mouseX * 50 * this.density * 0.1;
                const dy = mouseY * 50 * this.density * 0.1;

                this.baseX += this.vx;
                this.baseY += this.vy;

                if (this.baseX < 0) this.baseX = width;
                if (this.baseX > width) this.baseX = 0;
                if (this.baseY < 0) this.baseY = height;
                if (this.baseY > height) this.baseY = 0;

                this.x = this.baseX - dx;
                this.y = this.baseY - dy;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update(mousePos.x, mousePos.y);
                p.draw();
            });

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.lineWidth = 1 - dist / 150;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    useGSAP(() => {
        const tl = gsap.timeline();

        if (subtitle) {
            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0, rotateX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.02,
                    duration: 1,
                    ease: "back.out()"
                }
            );
        } else {
            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }

        tl.fromTo(contentRef.current,
            {
                clipPath: "inset(50% 50% 50% 50%)",
                scale: 1.1,
                autoAlpha: 0
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "expo.out"
            }, "-=0.5");

        gsap.to(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "center center",
                end: "bottom top",
                scrub: true,
            },
            opacity: 0,
            y: -100,
            scale: 0.95,
            filter: "blur(10px)"
        });

    }, { scope: sectionRef, dependencies: [subtitle] });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none"
            />

            <div className="container relative z-10 px-4 md:px-10 flex flex-col items-center">
                <article ref={titleRef} className="mb-8 md:mb-12 text-center max-w-4xl mx-auto perspective-500 min-h-[60px]">
                    <Typography type="h1" className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-400 overflow-hidden">
                        {subtitle || "Portfolio"}
                    </Typography>
                </article>

                <article ref={contentRef} className="relative w-full max-w-4xl aspect-video md:aspect-21/9 mx-auto perspective-1000 invisible">
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-white/5 bg-white/5 backdrop-blur-sm">
                        {error && (
                            <ErrorCard message={error || 'Error al cargar el post destacado'} />
                        )}

                        {posts && <PostRandom post={posts} width="600" height="600" className="w-full h-full object-cover" />}
                    </div>
                </article>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20 opacity-50 hover:opacity-100 transition-opacity">
                <Icon name="ArrowDown" size={24} className="text-white" />
            </div>
        </section>
    );
};