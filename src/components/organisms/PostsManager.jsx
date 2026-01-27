"use client"

import { useState, useEffect } from "react"
import usePosts from "@/hooks/usePosts"
import labelsApi from "@/api/labels"
import mediaApi from "@/api/media"
import Typography from "../atoms/Typography"
import { Button } from "@/components/atoms/Button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/molecules/Dialog"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"
import { IconPlus } from "@tabler/icons-react"
import PostList from "./posts/PostList"
import PostForm from "./posts/PostForm"

export function PostsManager() {
    const { posts, loading, createPost, updatePost, deletePost } = usePosts();
    const [labels, setLabels] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState({
        title: "",
        description: "",
        content: "",
        typePost: "image",
        labels: []
    })

    useEffect(() => {
        (async () => {
            const res = await labelsApi.labelsGet();
            if (!res.error) setLabels(res.data);
        })();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const res = await mediaApi.mediaCommissionPost({ file: file, context: currentPost.title?.toLowerCase() || 'post' })

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
        let result;
        if (isEditing) {
            result = await updatePost(currentPost.postId, currentPost);
        } else {
            result = await createPost(currentPost);
        }

        if (result.success) {
            toast.success(isEditing ? "Post updated" : "Post created")
            resetForm()
            setIsOpen(false)
        } else {
            toast.error("Action failed: " + result.error)
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
        const result = await deletePost(id);
        if (result.success) {
            toast.success("Post deleted")
        } else {
            toast.error("Delete failed: " + result.error)
        }
    }

    if (loading) return <LoaderCard title="Loading Posts..." />

    return (
        <section className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <Typography variant="subtitle" className="mb-6 text-foreground">Gestión de Posts</Typography>
                <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { resetForm(); setIsOpen(false) } else setIsOpen(true) }}>
                    <Button className="gap-2" onClick={handleCreate}>
                        <IconPlus size={18} /> Nuevo Post
                    </Button>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Editar Post" : "Crear Nuevo Post"}</DialogTitle>
                        </DialogHeader>
                        <PostForm
                            onSubmit={handleSubmit}
                            data={currentPost}
                            onChange={setCurrentPost}
                            labels={labels}
                            uploading={uploading}
                            onFileChange={handleFileChange}
                            isEditing={isEditing}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <PostList
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </section>
    )
}
