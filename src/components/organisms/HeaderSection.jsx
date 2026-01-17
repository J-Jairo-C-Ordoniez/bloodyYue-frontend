import Typography from "../atoms/Typography";
import Link from "../atoms/Link";
import Menu from "../molecules/Menu";

export default function HeaderSection({ title }) {
    const menu = [
        { title: 'Sobre mí', href: '#about' },
        { title: 'Trabajos', href: '#works' },
        { title: 'Comisiones', href: '#commissions' },
        { title: 'Testimonios', href: '#testimonials' },
    ];

    return (
        <header className="flex justify-center items-center bg-[#0B0B0E] min-h-[10vh]">
            <div className="flex justify-between items-center container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Typography variant="h1">{title}</Typography>
                </div>

                <Menu links={menu} />

                <div className="flex gap-4">
                    <Link href="/users/login" variant="secondary">Acceder</Link>
                    <Link href="/users/register" variant="primary">Registrarse</Link>
                </div>
            </div>
        </header>
    );
}