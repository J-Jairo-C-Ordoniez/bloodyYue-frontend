import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Label from '../atoms/Label';
import usePosts from '../../hooks/usePosts';
import LoaderCard from '../atoms/LoaderCard';
import PostRandom from '../molecules/PostRandom';
import Error from '../molecules/Error';

export default function HeroSection({ subtitle, abaut }) {
    const { post, isLoadingPost, errorPost } = usePosts();
    return (
        <section className="relative min-h-[90vh] overflow-hidden py-10 px-4 flex justify-center items-center bg-[#f8f9fc] dark:bg-[#0B0B0F]">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <article className="flex flex-col gap-8">
                    <div className="relative z-10 max-w-2xl flex flex-col gap-6 animate-fade-in-up">
                        <Label variant="status" color="#00C853" className="w-fit flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Comisones Abiertas
                        </Label>

                        <Typography variant="h1" className="text-6xl md:text-7xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
                            {subtitle}
                        </Typography>

                        <Typography variant="paragraph" className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                            {abaut}
                        </Typography>

                        <div className="flex gap-4 mt-6">
                            <Button variant="primary" size="large" className="rounded-full px-8 py-4 text-lg shadow-lg shadow-indigo-500/30">
                                Solicitar Comisión
                            </Button>
                            <Button variant="secondary" size="large" className="rounded-full px-8 py-4 text-lg border-2">
                                Ver Galería
                            </Button>
                        </div>
                    </div>


                    <div className="flex items-center gap-12 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">27.4k</span>
                            <span className="text-sm text-slate-500 font-medium">Followers</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">466</span>
                            <span className="text-sm text-slate-500 font-medium">Artworks</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">4.9/5</span>
                            <span className="text-sm text-slate-500 font-medium">Rating</span>
                        </div>
                    </div>
                </article>

                <div className="relative w-full aspect-4/5 max-w-[500px] mx-auto lg:ml-auto">
                    <div className="rotate-4 w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 transform transition-all duration-500 hover:shadow-indigo-500/40">
                        {isLoadingPost && <LoaderCard />}
                        {errorPost || post?.error && <Error message={post.message} typeError={post.typeError} />}
                        {post?.data && <PostRandom post={post.data} width={500} height={700} />}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
                <Icon name="ArrowDown" size={24} className="text-slate-400" />
            </div>
        </section>
    );
};
