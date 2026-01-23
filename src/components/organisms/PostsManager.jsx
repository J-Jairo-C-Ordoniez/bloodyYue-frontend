"use client"

import { useState, useEffect } from "react"
import postsApi from "@/api/posts"
import labelsApi from "@/api/labels"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"

export function PostsManager() {
    const [posts, setPosts] = useState([])
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [currentPost, setCurrentPost] = useState({
        title: "",
        description: "",
        content: "",
        typePost: "image",
        labels: []
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const [postsRes, labelsRes] = await Promise.all([
            postsApi.postListGet({id: 0}),
            labelsApi.labelsGet()
        ])
        if (!postsRes.error) setPosts(postsRes.data)
        if (!labelsRes.error) setLabels(labelsRes.data)
        setLoading(false)
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
    }

    const handleEdit = (post) => {
        setCurrentPost({
            ...post,
            labels: post.labels?.map(l => l.labelId) || []
        })
        setIsEditing(true)
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
                <Dialog onOpenChange={(open) => { if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <IconPlus size={18} /> New Post
                        </Button>
                    </DialogTrigger>
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
                                            <SelectItem value="short">Short</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="post-content">Content (URL/Path)</Label>
                                <Input id="post-content" value={currentPost.content} onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })} placeholder="URL de la imagen o contenido" required />
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

            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Labels</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.postId}>
                                <TableCell className="font-semibold">{post.title}</TableCell>
                                <TableCell className="capitalize">{post.typePost}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {post.labels?.map(l => (
                                            <span key={l.labelId} className="px-1.5 py-0.5 rounded-full text-[10px] border border-border" style={{ color: l.color }}>
                                                {l.name}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                                                <IconPencil size={18} className="text-primary" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Edit Post</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-post-title">Title</Label>
                                                        <Input id="edit-post-title" value={currentPost.title} onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })} required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-post-type">Type</Label>
                                                        <Select value={currentPost.typePost} onValueChange={(val) => setCurrentPost({ ...currentPost, typePost: val })}>
                                                            <SelectTrigger id="edit-post-type">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="image">Image</SelectItem>
                                                                <SelectItem value="short">Short</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-post-content">Content (URL/Path)</Label>
                                                    <Input id="edit-post-content" value={currentPost.content} onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })} required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-post-description">Description</Label>
                                                    <Textarea id="edit-post-description" value={currentPost.description} onChange={(e) => setCurrentPost({ ...currentPost, description: e.target.value })} required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Labels</Label>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border rounded-md">
                                                        {labels.map(label => (
                                                            <div key={label.labelId} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`edit-post-label-${label.labelId}`}
                                                                    checked={currentPost.labels.includes(label.labelId)}
                                                                    onCheckedChange={() => toggleLabel(label.labelId)}
                                                                />
                                                                <Label htmlFor={`edit-post-label-${label.labelId}`} className="text-xs cursor-pointer flex items-center gap-1">
                                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} />
                                                                    {label.name}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full">Update Post</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.postId)}>
                                        <IconTrash size={18} className="text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
