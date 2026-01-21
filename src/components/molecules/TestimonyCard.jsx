import Image from "../atoms/Image";
import Typography from "../atoms/Typography";

export default function TestimonyCard({ testimonyId, message }) {
    return (
        <article id={testimonyId} className="relative group h-full">
            <div className="container relative h-full p-10 rounded-2xl border border-white/5">
                <div className="flex flex-col justify-between gap-4">
                    <Typography variant="subtitle" className="text-gray-400 italic font-light leading-relaxed text-sm md:text-base">
                        "{message}"
                    </Typography>
                </div>
            </div>
        </article>
    );
}
