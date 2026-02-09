"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import usePosts from '../../hooks/usePosts';
import PostRandom from '../molecules/PostRandom';
import ErrorCard from '../molecules/ErrorCard';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ subtitle }) { 
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const canvasRef = useRef(null);
    const { posts, error } = usePosts(null, 'random');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60; 

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
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
                p.update();
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
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
            .from(contentRef.current, {
                y: 50,
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");

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

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505]" // Darker background
        >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none"
            />

            <div className="container relative z-10 px-4 md:px-10 flex flex-col items-center">
                <article ref={titleRef} className="mb-8 md:mb-12 text-center max-w-4xl mx-auto">
                    <Typography
                        variant="h1"
                        className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-400"
                    >
                        {subtitle}
                    </Typography>
                </article>

                <article ref={contentRef} className="relative w-full max-w-4xl aspect-video md:aspect-21/9 mx-auto perspective-1000">
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-white/5 bg-white/5 backdrop-blur-sm">
                        {error && (
                            <ErrorCard message={error || 'Error al cargar el post destacado'} />
                        )}
                        
                        {posts && <PostRandom post={posts} width="200" height="200" className="w-full h-full object-cover" />}
                    </div>
                </article>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20 opacity-50 hover:opacity-100 transition-opacity">
                <Icon name="ArrowDown" size={24} className="text-white" />
            </div>
        </section>
    );
};