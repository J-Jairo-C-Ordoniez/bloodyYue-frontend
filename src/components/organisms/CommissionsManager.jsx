"use client"

import { useState, useEffect } from "react"
import useCommissions from "@/hooks/useCommissions"
import labelsApi from "@/api/labels"
import postsApi from "@/api/posts"
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
import LoaderCard from "../molecules/LoaderCard"
import { IconPlus } from "@tabler/icons-react"
import CommissionList from "./commissions/CommissionList"
import CommissionForm from "./commissions/CommissionForm"

export function CommissionsManager() {
    const { commissions, loading, createCommission, updateCommission } = useCommissions();
    const [labels, setLabels] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [currentCommission, setCurrentCommission] = useState({
        title: "",
        content: "",
        description: "",
        price: "",
        terms: "",
        labels: [],
        exampleId: null
    })

    const [postsList, setPostsList] = useState([])
    const [postsLoading, setPostsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await labelsApi.labelsGet();
            if (!res.error) setLabels(res.data);
        })();
    }, []);

    useEffect(() => {
        if (isOpen && postsList.length === 0) {
            fetchPosts()
        }
    }, [isOpen, postsList.length]);

    const fetchPosts = async () => {
        setPostsLoading(true)
        const res = await postsApi.postListGet({ id: 0 })
        if (!res.error) setPostsList(res.data)
        setPostsLoading(false)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const res = await mediaApi.mediaCommissionPost({ file: file, context: currentCommission.title.toLocaleLowerCase() || 'commission' })

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
        let result;

        if (isEditing) {
            result = await updateCommission(currentCommission.commissionId, currentCommission);
        } else {
            result = await createCommission(currentCommission);
        }

        if (result.success) {
            toast.success(isEditing ? "Commission updated" : "Commission created")
            resetForm()
            setIsOpen(false)
        } else {
            toast.error("Action failed: " + result.error)
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

    const handleSelectPost = (postId) => {
        setCurrentCommission(prev => ({ ...prev, exampleId: postId }))
    }

    if (loading) return <LoaderCard title="Loading Commissions..." />

    return (
        <section className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <Typography variant="subtitle" className="mb-6 text-foreground">Gestión de Comisiones</Typography>
                <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { resetForm(); setIsOpen(false) } else setIsOpen(true) }}>
                    <Button className="gap-2" onClick={handleCreate}>
                        <IconPlus size={18} /> Nueva Comisión
                    </Button>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Editar Comisión" : "Crear Nueva Comisión"}</DialogTitle>
                        </DialogHeader>
                        <CommissionForm
                            onSubmit={handleSubmit}
                            data={currentCommission}
                            onChange={setCurrentCommission}
                            labels={labels}
                            postsList={postsList}
                            postsLoading={postsLoading}
                            uploading={uploading}
                            onFileChange={handleFileChange}
                            onSelectPost={handleSelectPost}
                            isEditing={isEditing}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <CommissionList
                commissions={commissions}
                onEdit={handleEdit}
            />
        </section>
    )
}
