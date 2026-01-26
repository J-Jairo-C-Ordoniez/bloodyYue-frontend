"use client"

import { useState, useEffect } from "react"
import postsApi from "@/api/posts"
import labelsApi from "@/api/labels"
import mediaApi from "@/api/media"
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
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"
import { IconPlus, IconPencil, IconTrash, IconUpload, IconVideo } from "@tabler/icons-react"

export function PostsManager() {
    const [posts, setPosts] = useState([])
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState({
        title: "",
        description: "",
        content: "",
        exampleId: "",
        typePost: "image",
        labels: []
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const [postsRes, labelsRes] = await Promise.all([
            postsApi.postListGet({ id: 0 }),
            labelsApi.labelsGet()
        ])
        if (!postsRes.error) setPosts(postsRes.data)
        if (!labelsRes.error) setLabels(labelsRes.data)
        setLoading(false)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const res = await mediaApi.mediaCommissionPost({ file: file, context: currentPost.title.toLocaleLowerCase() })

        if (!res.error) {
            setCurrentPost(prev => ({ ...prev, content: res.data }))
            toast.success("Media uploaded successfully")
        } else {
            toast.error("Error uploading media: " + res.message)
        }
        setUploading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response;
        if (isEditing) {
            response = await postsApi.postPut({ id: currentPost.postId, data: currentPost })
        } else {
            response = await postsApi.postPost({ data: currentPost })
        }

        if (!response.error) {
            toast.success(isEditing ? "Post updated" : "Post created")
            resetForm()
            fetchData()
        } else {
            toast.error("Action failed: " + response.message)
        }
    }

    const resetForm = () => {
        setCurrentPost({
            title: "",
            description: "",
            content: "",
            typePost: "image",
            labels: []
        })
        setIsEditing(false)
        setUploading(false)
        setIsOpen(false)
    }

    const handleCreate = () => {
        resetForm()
        setIsEditing(false)
        setIsOpen(true)
    }

    const handleEdit = (post) => {
        setCurrentPost({
            ...post,
            labels: post.labels?.map(l => l.labelId) || []
        })
        setIsEditing(true)
        setIsOpen(true)
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return
        const response = await postsApi.postDelete(id)
        if (!response.error) {
            toast.success("Post deleted")
            fetchData()
        } else {
            toast.error("Delete failed: " + response.message)
        }
    }

    const toggleLabel = (labelId) => {
        setCurrentPost(prev => {
            const hasLabel = prev.labels.includes(labelId)
            if (hasLabel) {
                return { ...prev, labels: prev.labels.filter(id => id !== labelId) }
            } else {
                return { ...prev, labels: [...prev.labels, labelId] }
            }
        })
    }

    if (loading) return <LoaderCard title="Loading Posts..." />

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Post Management</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetForm(); else setIsOpen(true) }}>
                    <Button className="gap-2" onClick={handleCreate}>
                        <IconPlus size={18} /> New Post
                    </Button>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Post" : "Create New Post"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="post-title">Title</Label>
                                    <Input id="post-title" value={currentPost.title} onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="post-type">Type</Label>
                                    <Select value={currentPost.typePost} onValueChange={(val) => setCurrentPost({ ...currentPost, typePost: val })}>
                                        <SelectTrigger id="post-type">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="short">Short (Video)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Content (Image/Video)</Label>
                                <div className="relative w-full h-40 bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 group hover:border-primary/50 transition-all flex items-center justify-center">
                                    {uploading ? (
                                        <div className="text-sm text-muted-foreground animate-pulse">Uploading...</div>
                                    ) : currentPost.content ? (
                                        currentPost.typePost === 'short' ? (
                                            <video src={currentPost.content} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={currentPost.content} alt="Preview" className="w-full h-full object-cover" />
                                        )
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            {currentPost.typePost === 'short' ? <IconVideo size={32} className="mb-2 opacity-50" /> : <IconPencil size={32} className="mb-2 opacity-50" />}
                                            <span className="text-sm">Upload media</span>
                                        </div>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity text-white font-medium">
                                        <IconUpload size={24} className="mr-2" /> Change
                                        <input type="file" accept={currentPost.typePost === 'short' ? "video/*" : "image/*"} className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="post-description">Description</Label>
                                <Textarea id="post-description" value={currentPost.description} onChange={(e) => setCurrentPost({ ...currentPost, description: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Labels</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border rounded-md">
                                    {labels.map(label => (
                                        <div key={label.labelId} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`post-label-${label.labelId}`}
                                                checked={currentPost.labels.includes(label.labelId)}
                                                onCheckedChange={() => toggleLabel(label.labelId)}
                                            />
                                            <Label htmlFor={`post-label-${label.labelId}`} className="text-xs cursor-pointer flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} />
                                                {label.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit" className="w-full">{isEditing ? "Update" : "Create"}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

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
                                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary" onClick={() => handleEdit(post)}>
                                    <IconPencil size={16} className="mr-2" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(post.postId)}>
                                    <IconTrash size={16} className="mr-2" /> Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
