"use client"

import { useState, useEffect } from "react"
import commissionsApi from "@/api/commissions"
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
} from "../ui/table"

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
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"

export function CommissionsManager() {
    const [commissions, setCommissions] = useState([])
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [currentCommission, setCurrentCommission] = useState({
        title: "",
        content: "",
        description: "",
        price: "",
        terms: "",
        labels: []
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const [commRes, labelsRes] = await Promise.all([
            commissionsApi.commissionListGet(),
            labelsApi.labelsGet()
        ])
        if (!commRes.error) setCommissions(commRes.data)
        if (!labelsRes.error) setLabels(labelsRes.data)
        setLoading(false)
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
            labels: []
        })
        setIsEditing(false)
    }

    const handleEdit = (comm) => {
        setCurrentCommission({
            ...comm,
            labels: comm.labels?.map(l => l.labelId) || []
        })
        setIsEditing(true)
    }

    const toggleLabel = (labelId) => {
        setCurrentCommission(prev => {
            const hasLabel = prev.labels.includes(labelId)
            if (hasLabel) {
                return { ...prev, labels: prev.labels.filter(id => id !== labelId) }
            } else {
                return { ...prev, labels: [...prev.labels, labelId] }
            }
        })
    }

    if (loading) return <LoaderCard title="Loading Commissions..." />

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Commission Management</h2>
                <Dialog onOpenChange={(open) => { if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <IconPlus size={18} /> New Commission
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Commission" : "Create New Commission"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" value={currentCommission.title} onChange={(e) => setCurrentCommission({ ...currentCommission, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" type="number" step="0.01" value={currentCommission.price} onChange={(e) => setCurrentCommission({ ...currentCommission, price: e.target.value })} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={currentCommission.description} onChange={(e) => setCurrentCommission({ ...currentCommission, description: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="terms">Terms</Label>
                                <Textarea id="terms" value={currentCommission.terms} onChange={(e) => setCurrentCommission({ ...currentCommission, terms: e.target.value })} rows={4} />
                            </div>
                            <div className="space-y-2">
                                <Label>Labels</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border rounded-md">
                                    {labels.map(label => (
                                        <div key={label.labelId} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`label-${label.labelId}`}
                                                checked={currentCommission.labels.includes(label.labelId)}
                                                onCheckedChange={() => toggleLabel(label.labelId)}
                                            />
                                            <Label htmlFor={`label-${label.labelId}`} className="text-xs cursor-pointer flex items-center gap-1">
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
                            <TableHead>Price</TableHead>
                            <TableHead>Labels</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {commissions.map((comm) => (
                            <TableRow key={comm.commissionId}>
                                <TableCell className="font-semibold">{comm.title}</TableCell>
                                <TableCell>${comm.price}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {comm.labels?.map(l => (
                                            <span key={l.labelId} className="px-1.5 py-0.5 rounded-full text-[10px] border border-border" style={{ color: l.color }}>
                                                {l.name}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(comm)}>
                                                <IconPencil size={18} className="text-primary" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Edit Commission</DialogTitle>
                                            </DialogHeader>
                                            {/* Re-using the same form content... in a real app I'd extract this to a sub-component */}
                                            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-title">Title</Label>
                                                        <Input id="edit-title" value={currentCommission.title} onChange={(e) => setCurrentCommission({ ...currentCommission, title: e.target.value })} required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-price">Price</Label>
                                                        <Input id="edit-price" type="number" step="0.01" value={currentCommission.price} onChange={(e) => setCurrentCommission({ ...currentCommission, price: e.target.value })} required />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-description">Description</Label>
                                                    <Textarea id="edit-description" value={currentCommission.description} onChange={(e) => setCurrentCommission({ ...currentCommission, description: e.target.value })} required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-terms">Terms</Label>
                                                    <Textarea id="edit-terms" value={currentCommission.terms} onChange={(e) => setCurrentCommission({ ...currentCommission, terms: e.target.value })} rows={4} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Labels</Label>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border rounded-md">
                                                        {labels.map(label => (
                                                            <div key={label.labelId} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`edit-label-${label.labelId}`}
                                                                    checked={currentCommission.labels.includes(label.labelId)}
                                                                    onCheckedChange={() => toggleLabel(label.labelId)}
                                                                />
                                                                <Label htmlFor={`edit-label-${label.labelId}`} className="text-xs cursor-pointer flex items-center gap-1">
                                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} />
                                                                    {label.name}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full">Update Commission</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
