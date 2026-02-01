import { IconPencil, IconTrash, IconImage } from "@tabler/icons-react"
import { Button } from "../../atoms/Button"

export default function PostList({ posts, onEdit, onDelete }) {
    if (!posts || posts.length === 0) {
        return <div className="text-center p-8 text-muted-foreground">No posts found.</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <div key={post.postId} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="aspect-video relative bg-muted overflow-hidden">
                        {post.content ? (
                            post.typePost === 'short' ? (
                                <video src={post.content} className="w-full h-full object-cover" />
                            ) : (
                                <img src={post.content} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                                <IconPencil size={48} className="opacity-20" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm border border-white/10 text-white">
                                {post.typePost}
                            </span>
                        </div>
                        <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap max-w-full">
                            {post.labels?.map(l => (
                                <span key={l.labelId} className="px-2 py-0.5 rounded-full text-[10px] border border-white/10 bg-black/40 text-white" style={{ color: l.color }}>
                                    {l.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg leading-tight line-clamp-1 mb-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.description}</p>

                        <div className="pt-3 border-t border-border flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary" onClick={() => onEdit(post)}>
                                <IconPencil size={16} className="mr-2" /> Editar
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive" onClick={() => onDelete(post.postId)}>
                                <IconTrash size={16} className="mr-2" /> Eliminar
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
