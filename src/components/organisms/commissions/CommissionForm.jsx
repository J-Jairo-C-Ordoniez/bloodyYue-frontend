import { Button } from "@/components/atoms/Button"
import { Input } from "@/components/atoms/Input"
import { Label } from "@/components/atoms/Label"
import { Textarea } from "@/components/atoms/Textarea"
import { Checkbox } from "@/components/atoms/Checkbox"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/molecules/Dialog"
import LoaderCard from "@/components/molecules/LoaderCard"
import { IconTrash, IconUpload, IconPencil } from "@tabler/icons-react"
import { useState } from "react"

export default function CommissionForm({
    onSubmit,
    data,
    onChange,
    labels,
    postsList,
    postsLoading,
    uploading,
    onFileChange,
    onSelectPost,
    isEditing
}) {
    const [isPostSelectionOpen, setIsPostSelectionOpen] = useState(false)

    const handleSelectPost = (postId) => {
        onSelectPost(postId)
        setIsPostSelectionOpen(false)
    }

    const toggleLabel = (labelId) => {
        const currentLabels = data.labels || [];
        const newLabels = currentLabels.includes(labelId)
            ? currentLabels.filter(id => id !== labelId)
            : [...currentLabels, labelId];
        onChange({ ...data, labels: newLabels });
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title" color="#A1A1AA">Título</Label>
                    <Input id="title" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price" color="#A1A1AA">Precio</Label>
                    <Input id="price" type="number" step="0.01" value={data.price} onChange={(e) => onChange({ ...data, price: e.target.value })} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label color="#A1A1AA">Contenido (Imagen)</Label>
                <div className="relative w-full h-40 bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 group hover:border-primary/50 transition-all flex items-center justify-center">
                    {uploading ? (
                        <div className="text-sm text-muted-foreground animate-pulse">Subiendo...</div>
                    ) : data.content ? (
                        <img src={data.content} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                            <IconPencil size={32} className="mb-2 opacity-50" />
                            <span className="text-sm">Subir imagen</span>
                        </div>
                    )}
                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity text-white font-medium">
                        <IconUpload size={24} className="mr-2" /> Cambiar
                        <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <Label color="#A1A1AA">Ejemplo de Post</Label>
                <div className="flex items-center gap-4 border p-3 rounded-md border-border">
                    {data.exampleId ? (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-green-500">ID Seleccionado: {data.exampleId}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...data, exampleId: null })}><IconTrash size={14} /></Button>
                        </div>
                    ) : (
                        <span className="text-muted-foreground text-sm">Ningún ejemplo seleccionado</span>
                    )}
                    <Dialog open={isPostSelectionOpen} onOpenChange={setIsPostSelectionOpen}>
                        <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm" onClick={() => setIsPostSelectionOpen(true)}>
                                Seleccionar Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Seleccionar un Post de Ejemplo</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                                {postsLoading ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <LoaderCard variant="card" />
                                        <LoaderCard variant="card" />
                                        <LoaderCard variant="card" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {postsList.map(post => (
                                            <div
                                                key={post.postId}
                                                className="cursor-pointer border border-transparent hover:border-primary rounded-xl overflow-hidden transition-all bg-card"
                                                onClick={() => handleSelectPost(post.postId)}
                                            >
                                                <div className="aspect-video bg-muted relative">
                                                    {post.typePost === 'short' ? (
                                                        <video src={post.content} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={post.content} alt={post.title} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div className="p-3">
                                                    <p className="font-bold text-sm truncate">{post.title}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{post.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" color="#A1A1AA">Descripción</Label>
                <Textarea id="description" value={data.description} onChange={(e) => onChange({ ...data, description: e.target.value })} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="terms" color="#A1A1AA">Terminos</Label>
                <Textarea id="terms" value={data.terms} onChange={(e) => onChange({ ...data, terms: e.target.value })} rows={4} />
            </div>
            <div className="space-y-2">
                <Label color="#A1A1AA">Etiquetas</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border rounded-md">
                    {labels.map(label => (
                        <div key={label.labelId} className="flex items-center space-x-2">
                            <Checkbox
                                id={`label-${label.labelId}`}
                                checked={(data.labels || []).includes(label.labelId)}
                                onCheckedChange={() => toggleLabel(label.labelId)}
                            />
                            <Label htmlFor={`label-${label.labelId}`} color="#A1A1AA" className="text-xs cursor-pointer flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} />
                                {label.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <Button type="submit" className="w-full">{isEditing ? "Update" : "Create"}</Button>
        </form>
    )
}
