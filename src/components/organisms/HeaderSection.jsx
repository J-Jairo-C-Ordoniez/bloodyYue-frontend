import Typography from "../atoms/Typography";
import Button from "../atoms/Button";
import Menu from "../molecules/Menu";

export default function HeaderSection({ title }) {
    const menu = [
        { title: 'Sobre mí', href: '#about' },
        { title: 'Trabajos', href: '#works' },
        { title: 'Comisiones', href: '#commissions' },
        { title: 'Testimonios', href: '#testimonials' },
    ];

    return (
        <header className="flex justify-center items-center bg-foreground dark:bg-background min-h-[10vh]">
            <div className="flex justify-between items-center container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Typography variant="h1">{title}</Typography>
                </div>

                <Menu links={menu} />

                <div className="flex gap-4">
                    <Button variant="secondary">Acceder</Button>
                    <Button variant="primary">Registrarse</Button>
                </div>
            </div>
        </header>
    );
}