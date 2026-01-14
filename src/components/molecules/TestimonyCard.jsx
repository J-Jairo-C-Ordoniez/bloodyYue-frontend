import Image from "../atoms/Image";
import Typography from "../atoms/Typography";

export default function TestimonyCard({ testimonyId, userId, message, name='Juan Cadenas', role='Cliente', avatar='https://res.cloudinary.com/del3gtz5i/image/upload/v1768268631/c6ae2f9e-0eab-44c9-84a9-fe17fcf4adc1_csoof2.webp' }) {
    return (
        <div className="relative group h-full">
            {/* Outer border container */}
            <div className="relative h-full p-1 bg-linear-to-br from-white/20 to-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">

                {/* Inner Card */}
                <div className="relative h-full flex flex-col md:flex-row gap-6 bg-[#0B0B0E] rounded-[20px] p-6 border border-white/5">

                    {/* Avatar Column */}
                    <div className="shrink-0">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/10 ring-2 ring-white/5">
                            <Image
                                src={avatar || "https://ui-avatars.com/api/?name=" + name}
                                alt={name}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col justify-between gap-4">
                        <Typography variant="body" className="text-gray-400 italic font-light leading-relaxed text-sm md:text-base">
                            "{message}"
                        </Typography>

                        <div>
                            <Typography variant="h4" className="text-white font-bold text-lg tracking-wide uppercase">
                                {name}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500 font-medium tracking-wider text-xs uppercase mt-0.5">
                                {role}
                            </Typography>
                        </div>
                    </div>

                </div>

                {/* Decorative elements to mimic the "connector" lines in the reference image if needed, 
            but for now keeping it clean as a standalone card. 
            The reference image shows lines connecting cards, which is complex CSS. 
            I will focus on the individual card style first.
        */}
            </div>
        </div>
    );
}
