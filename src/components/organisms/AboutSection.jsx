import SectionHeader from '../molecules/SectionHeader';
import Typography from '../atoms/Typography';
import Label from '../atoms/Label';
import Icon from '../atoms/Icon';

export default function AboutSection({ abaut, work, content }) {
    const labels = [
        {
            id: 1,
            title: "Arte Digital",
            color: "#00C853",
            icon: "PaintRoller",
        },
        {
            id: 2,
            title: "Fantasia Oscura",
            color: "#FF0000",
            icon: "Moon",
        },
        {
            id: 3,
            title: "Diseño 2D",
            color: "#FFD700",
            icon: "Wallpaper",
        }
    ]

    return (
        <section className="py-20 px-4 bg-foreground dark:bg-background">
            <div className="container max-w-4xl mx-auto">
                <SectionHeader
                    title="Sobre mí"
                    subtitle="Un vistazo a quién soy y lo que hago."
                    content={content}
                />

                <article>
                    <Typography variant="paragraph" className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-center mb-8">
                        {abaut}
                    </Typography>

                    <Typography variant="paragraph" className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-center">
                        {work}
                    </Typography>
                </article>

                <div className='mt-10 flex justify-center items-center gap-4'>
                    {labels.map((label) => (
                        <Label
                            key={label.id}
                            color={label.color}
                            variant="solid"
                            className="w-fit flex items-center gap-2"
                        >
                            <Icon name={label.icon} size={24} />
                            {label.title}
                        </Label>
                    ))}
                </div>
            </div>
        </section>
    );
};
