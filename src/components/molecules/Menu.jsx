import Link from "../atoms/Link";

export default function Menu({ variant = 'default', links }) {
    const variants = {
        default: 'flex gap-4',
        mobile: 'flex flex-col gap-2',
    };

    return (
        <nav className="menu">
            <ul className={variants[variant]}>
                {links.map((item, index) => (
                    <li key={index}>
                        <Link href={item.href} variant="default">{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
