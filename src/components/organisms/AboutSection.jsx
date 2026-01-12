import SectionHeader from '../molecules/SectionHeader';
import Typography from '../atoms/Typography';

export default function AboutSection({ content }) {
    return (
        <section className="py-20 px-4 bg-linear-to-b from-black to-gray-900">
            <div className="max-w-4xl mx-auto">
                <SectionHeader
                    title="About Me"
                    subtitle="A glimpse into who I am and what I do."
                />

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <Typography variant="body" className="text-justify leading-relaxed text-gray-300">
                        {content}
                    </Typography>
                </div>
            </div>
        </section>
    );
};
