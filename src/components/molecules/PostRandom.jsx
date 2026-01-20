import Image from "../atoms/Image";
import Label from "../atoms/Label";
import Typography from "../atoms/Typography";
import Icon from "../atoms/Icon";

export default function PostRandom({ post, width, height }) {
    return (
        <article className="relative w-full h-full group overflow-hidden bg-white/5 ring-1 ring-white/10 rounded-3xl shadow-2xl">
            <div className="absolute inset-0">
                <Image
                    src={post.content}
                    alt={post.title}
                    width={width}
                    height={height}
                    variant="hero"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            <div className="absolute top-6 right-6 z-20">
                <Label variant="pill" className="bg-white/90 backdrop-blur-sm text-yellow-600 shadow-xl border-none">
                    <Icon name="Star" size={16} className="fill-current" />
                    Top Rated Artist
                </Label>
            </div>

            <footer className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500">
                <div className="flex flex-col gap-2">
                    <Typography variant="h3" className="text-white">
                        {post.title}
                    </Typography>

                    <div className="flex items-center gap-3 text-slate-300">
                        <span className="text-sm font-medium tracking-wide uppercas bg-white/10 px-3 py-1 rounded-md backdrop-blur-md border border-white/10">
                            Full Render
                        </span>
                    </div>
                </div>
            </footer>
        </article>
    );
}