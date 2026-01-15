import Image from "../atoms/Image"
import Typography from "../atoms/Typography"

export default function FeaturedWorkSidePanel({ post }) {
    return (
        <section className="hidden lg:flex relative w-1/2 h-full bg-black/50 items-end p-12 overflow-hidden">
            <div className="absolute inset-0 w-full h-full opacity-80">
                <Image
                    src={post.content}
                    alt={post.title}
                    fill
                />
            </div>

            <article className="relative z-20 text-white">
                <Typography variant="small" className="tracking-[0.2em] mb-2 uppercase">
                    {post.title}
                </Typography>
                <Typography variant="subtitle" className="uppercase text-gray-400">
                    {post.typePost}
                </Typography>
            </article>

            <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                <Typography variant="h1">BloodyYue</Typography>
            </div>
        </section>
    );
}
