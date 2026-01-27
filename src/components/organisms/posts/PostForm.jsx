import { Button } from "@/components/atoms/Button"
import { Input } from "@/components/atoms/Input"
import { Label } from "@/components/atoms/Label"
import { Textarea } from "@/components/atoms/Textarea"
import { Checkbox } from "@/components/atoms/Checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/molecules/Select"
import { IconUpload, IconVideo, IconPencil } from "@tabler/icons-react"

export default function PostForm({
    onSubmit,
    data,
    onChange,
    labels,
    uploading,
    onFileChange,
    isEditing
}) {

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
                    <Label htmlFor="post-title" color="#A1A1AA">Título</Label>
                    <Input id="post-title" value={data.title || ''} onChange={(e) => onChange({ ...data, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="post-type" color="#A1A1AA">Tipo</Label>
                    <Select value={data.typePost} onValueChange={(val) => onChange({ ...data, typePost: val })}>
                        <SelectTrigger id="post-type">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="image">Imagen</SelectItem>
                            <SelectItem value="short">Short (Video)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label color="#A1A1AA">Contenido (Imagen/Video)</Label>
                <div className="relative w-full h-40 bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 group hover:border-primary/50 transition-all flex items-center justify-center">
                    {uploading ? (
                        <div className="text-sm text-muted-foreground animate-pulse">Subiendo...</div>
                    ) : data.content ? (
                        data.typePost === 'short' ? (
                            <video src={data.content} className="w-full h-full object-cover" />
                        ) : (
                            <img src={data.content} alt="Preview" className="w-full h-full object-cover" />
                        )
                    ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                            {data.typePost === 'short' ? <IconVideo size={32} className="mb-2 opacity-50" /> : <IconPencil size={32} className="mb-2 opacity-50" />}
                            <span className="text-sm">Subir archivo</span>
                        </div>
                    )}
                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity text-white font-medium">
                        <IconUpload size={24} className="mr-2" /> Cambiar
                        <input type="file" accept={data.typePost === 'short' ? "video/*" : "image/*"} className="hidden" onChange={onFileChange} />
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="post-description" color="#A1A1AA">Descripción</Label>
                <Textarea id="post-description" value={data.description || ''} onChange={(e) => onChange({ ...data, description: e.target.value })} required />
            </div>

            <div className="space-y-2">
                <Label color="#A1A1AA">Etiquetas</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border rounded-md">
                    {labels.map(label => (
                        <div key={label.labelId} className="flex items-center space-x-2">
                            <Checkbox
                                id={`post-label-${label.labelId}`}
                                checked={(data.labels || []).includes(label.labelId)}
                                onCheckedChange={() => toggleLabel(label.labelId)}
                            />
                            <Label htmlFor={`post-label-${label.labelId}`} color="#A1A1AA" className="text-xs cursor-pointer flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} />
                                {label.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <Button type="submit" className="w-full">{isEditing ? "Actualizar" : "Crear"}</Button>
        </form>
    )
}
