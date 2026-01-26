"use client"

import { useState, useEffect } from "react"
import commissionsApi from "@/api/commissions"
import labelsApi from "@/api/labels"
import postsApi from "@/api/posts"
import mediaApi from "@/api/media"
import Typography from "../atoms/Typography"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Checkbox } from "../ui/checkbox"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"
import { IconPlus, IconPencil, IconTrash, IconUpload } from "@tabler/icons-react"

export function CommissionsManager() {
    const [commissions, setCommissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [currentCommission, setCurrentCommission] = useState({
        title: "",
        content: "",
        description: "",
        price: "",
        terms: "",
        exampleId: null
    })

    const [postsList, setPostsList] = useState([])
    const [postsLoading, setPostsLoading] = useState(false)
    const [isPostSelectionOpen, setIsPostSelectionOpen] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const commRes = await commissionsApi.commissionListGet({ id: 0 })
        if (!commRes.error) setCommissions(commRes.data)

        setLoading(false)
    }

    const fetchPosts = async () => {
        setPostsLoading(true)
        const res = await postsApi.postListGet({ id: 0 })
        if (!res.error) setPostsList(res.data)
        setPostsLoading(false)
    }

    const handleOpenPostSelection = () => {
        setIsPostSelectionOpen(true)
        if (postsList.length === 0) {
            fetchPosts()
        }
    }

    const handleSelectPost = (postId) => {
        setCurrentCommission(prev => ({ ...prev, exampleId: postId }))
        setIsPostSelectionOpen(false)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const res = await mediaApi.mediaCommissionPost({ file: file, context: currentCommission.title.toLocaleLowerCase() })

        if (!res.error) {
            setCurrentCommission(prev => ({ ...prev, content: res.data }))
            toast.success("Image uploaded successfully")
        } else {
            toast.error("Error uploading image: " + res.message)
        }
        setUploading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response;

        if (isEditing) {
            response = await commissionsApi.commissionPut({ id: currentCommission.commissionId, data: currentCommission })
        } else {
            response = await commissionsApi.commissionPost({ data: currentCommission })
        }

        if (!response.error) {
            toast.success(isEditing ? "Commission updated" : "Commission created")
            resetForm()
            fetchData()
        } else {
            toast.error("Action failed: " + response.message)
        }
    }

    const resetForm = () => {
        setCurrentCommission({
            title: "",
            content: "",
            description: "",
            price: "",
            terms: "",
            labels: [],
            exampleId: null
        })
        setIsEditing(false)
        setUploading(false)
        setIsOpen(false)
    }

    const handleEdit = (comm) => {
        setCurrentCommission({
            ...comm,
            labels: comm.labels?.map(l => l.labelId) || [],
            exampleId: comm.exampleId || null
        })
        setIsEditing(true)
        setIsOpen(true)
    }

    const handleCreate = () => {
        resetForm()
        setIsEditing(false)
        setIsOpen(true)
    }

    if (loading) return <LoaderCard title="Loading Commissions..." />

    return (
        <section className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <Typography variant="subtitle" className="mb-6 text-foreground">Gestión de Comisiones</Typography>
                <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetForm(); else setIsOpen(true) }}>
                    <Button className="gap-2" onClick={handleCreate}>
                        <IconPlus size={18} /> Nueva Comisión
                    </Button>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Editar Comisión" : "Crear Nueva Comisión"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título</Label>
                                    <Input id="title" value={currentCommission.title} onChange={(e) => setCurrentCommission({ ...currentCommission, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio</Label>
                                    <Input id="price" type="number" step="0.01" value={currentCommission.price} onChange={(e) => setCurrentCommission({ ...currentCommission, price: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Contenido (Imagen)</Label>
                                <div className="relative w-full h-40 bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 group hover:border-primary/50 transition-all flex items-center justify-center">
                                    {uploading ? (
                                        <div className="text-sm text-muted-foreground animate-pulse">Subiendo...</div>
                                    ) : currentCommission.content ? (
                                        <img src={currentCommission.content} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <IconPencil size={32} className="mb-2 opacity-50" />
                                            <span className="text-sm">Subir imagen</span>
                                        </div>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity text-white font-medium">
                                        <IconUpload size={24} className="mr-2" /> Cambiar
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Ejemplo de Post</Label>
                                <div className="flex items-center gap-4 border p-3 rounded-md border-border">
                                    {currentCommission.exampleId ? (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="font-semibold text-green-500">ID Seleccionado: {currentCommission.exampleId}</span>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => setCurrentCommission(prev => ({ ...prev, exampleId: null }))}><IconTrash size={14} /></Button>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground text-sm">Ningún ejemplo seleccionado</span>
                                    )}
                                    <Dialog open={isPostSelectionOpen} onOpenChange={setIsPostSelectionOpen}>
                                        <DialogTrigger asChild>
                                            <Button type="button" variant="outline" size="sm" onClick={handleOpenPostSelection}>
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
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea id="description" value={currentCommission.description} onChange={(e) => setCurrentCommission({ ...currentCommission, description: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="terms">Terminos</Label>
                                <Textarea id="terms" value={currentCommission.terms} onChange={(e) => setCurrentCommission({ ...currentCommission, terms: e.target.value })} rows={4} />
                            </div>
                            <Button type="submit" className="w-full">{isEditing ? "Update" : "Create"}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commissions && commissions.map((comm) => (
                    <div key={comm.commissionId} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="aspect-video relative bg-muted overflow-hidden">
                            {comm.content ? (
                                <img src={comm.content} alt={comm.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                                    <IconPencil size={48} className="opacity-20" />
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg leading-tight line-clamp-1">{comm.title}</h3>
                                <span className="font-mono font-bold text-primary">${comm.price}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{comm.description}</p>

                            <div className="pt-3 border-t border-border flex justify-end">
                                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary" onClick={() => handleEdit(comm)}>
                                    <IconPencil size={16} className="mr-2" /> Editar
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
