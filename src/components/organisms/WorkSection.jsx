import SectionHeader from '../molecules/SectionHeader';
import Typography from '../atoms/Typography';

export default function WorkSection({ content }) {
    return (
        <section className="py-20 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
                <SectionHeader
                    title="My Work"
                    subtitle="Projects and professional experience."
                    align="left"
                />

                <div className="grid gap-8">
                    {/* Assuming content is text for now, but could be smarter if JSON. 
               The prompt says 'work TEXT NOT NULL', so it is likely a block of text. */}
                    <div className="p-6 rounded-xl border-l-4 border-purple-500 bg-white/5 hover:bg-white/10 transition-colors">
                        <Typography variant="body">
                            {content}
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    );
};
