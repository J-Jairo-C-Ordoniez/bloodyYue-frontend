import Typography from "../atoms/Typography";
import Button from "../atoms/Button";
import Link from "../atoms/Link";

export default function HeaderSection({ title }) {
    const menu = [
        { title: 'Sobre mí', href: '#about' },
        { title: 'Portafolio', href: '#portfolio' },
        { title: 'Comisiones', href: '#commissions' },
        { title: 'Trabajo', href: '#work' },
        { title: 'Testimonios', href: '#testimonials' },
    ];

    return (
        <header className="flex justify-center items-center bg-foreground dark:bg-background min-h-[10vh]">
            <div className="flex justify-between items-center container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Typography variant="h1">{title}</Typography>
                </div>

                <nav>
                    <ul className="flex gap-4">
                        {menu.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} variant="primary">{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex gap-4">
                    <Button variant="secondary">Acceder</Button>
                    <Button variant="primary">Registrarse</Button>
                </div>
            </div>
        </header>
    );
}