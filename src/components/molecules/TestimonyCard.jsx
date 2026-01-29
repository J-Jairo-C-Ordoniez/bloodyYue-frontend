import Image from "../atoms/Image";
import Typography from "../atoms/Typography";

export default function TestimonyCard({ testimonyId, message }) {
    return (
        <article id={testimonyId} className="relative group h-full">
            <div className="relative h-full p-8 md:p-10 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/4">
                <div className="flex flex-col justify-between gap-4 h-full">
                    <Typography variant="body" className="text-gray-400 italic font-light leading-relaxed text-sm md:text-base">
                        "{message}"
                    </Typography>
                </div>
            </div>
        </article>
    );
}
