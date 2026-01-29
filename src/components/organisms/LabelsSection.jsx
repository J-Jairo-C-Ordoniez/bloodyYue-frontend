"use client"

import { useState, useEffect } from "react"
import useLabels from "../../hooks/useLabels"
import Typography from "../atoms/Typography"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { Label } from "../atoms/Label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../molecules/Table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../molecules/Dialog"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"
import { IconPlus, IconTrash, IconPencil } from "@tabler/icons-react"

export default function LabelsSection() {
    const { labels, loading, createLabel, updateLabel, deleteLabel, refreshLabels } = useLabels()
    const [isEditing, setIsEditing] = useState(false)
    const [currentLabel, setCurrentLabel] = useState({ name: "", color: "#000000" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response;
        if (isEditing) {
            response = await updateLabel(currentLabel.labelId, currentLabel)
        } else {
            response = await createLabel({ name: currentLabel.name, color: currentLabel.color })
        }

        if (!response.error) {
            toast.success(isEditing ? "Label updated" : "Label created")
            setCurrentLabel({ name: "", color: "#000000" })
            setIsEditing(false)
            refreshLabels()
        } else {
            toast.error("Action failed: " + response.message)
        }
    }

    const handleEdit = (label) => {
        setCurrentLabel(label)
        setIsEditing(true)
    }

    const handleDelete = async (id) => {
        const response = await deleteLabel(id)
        if (!response.error) {
            toast.success("Label deleted")
            refreshLabels()
        } else {
            toast.error("Delete failed: " + response.message)
        }
    }

    if (loading) return <LoaderCard title="Loading Labels..." />

    return (
        <section className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <Typography variant="subtitle" className="mb-6 text-foreground">Gestión de Etiquetas</Typography>
                <Dialog onOpenChange={(open) => { if (!open) { setIsEditing(false); setCurrentLabel({ name: "", color: "#000000" }); } }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <IconPlus size={18} /> Nueva Etiqueta
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Editar Etiqueta" : "Crear Nueva Etiqueta"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="labelName" color="#A1A1AA">Nombre de la Etiqueta</Label>
                                <Input
                                    id="labelName"
                                    value={currentLabel.name}
                                    onChange={(e) => setCurrentLabel({ ...currentLabel, name: e.target.value })}
                                    placeholder="e.g., Digital Art"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="labelColor" color="#A1A1AA">Color</Label>
                                <div className="flex gap-3">
                                    <Input
                                        id="labelColor"
                                        type="color"
                                        className="w-12 h-10 p-1"
                                        value={currentLabel.color}
                                        onChange={(e) => setCurrentLabel({ ...currentLabel, color: e.target.value })}
                                    />
                                    <Input
                                        value={currentLabel.color}
                                        onChange={(e) => setCurrentLabel({ ...currentLabel, color: e.target.value })}
                                        placeholder="#000000"
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">{isEditing ? "Update Label" : "Create Label"}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Vista Previa</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Código de Color</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {labels.map((label) => (
                            <TableRow key={label.labelId}>
                                <TableCell>
                                    <div
                                        className="w-8 h-8 rounded-full border border-border"
                                        style={{ backgroundColor: label.color }}
                                    />
                                </TableCell>
                                <TableCell className="font-semibold">{label.name}</TableCell>
                                <TableCell className="font-mono text-xs uppercase">{label.color}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(label)}>
                                                <IconPencil size={18} className="text-primary" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Editar Etiqueta</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="editName" color="#A1A1AA">Nombre de la Etiqueta</Label>
                                                    <Input
                                                        id="editName"
                                                        value={currentLabel.name}
                                                        onChange={(e) => setCurrentLabel({ ...currentLabel, name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="editColor" color="#A1A1AA">Color</Label>
                                                    <div className="flex gap-3">
                                                        <Input
                                                            id="editColor"
                                                            type="color"
                                                            className="w-12 h-10 p-1"
                                                            value={currentLabel.color}
                                                            onChange={(e) => setCurrentLabel({ ...currentLabel, color: e.target.value })}
                                                        />
                                                        <Input
                                                            value={currentLabel.color}
                                                            onChange={(e) => setCurrentLabel({ ...currentLabel, color: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full">Update Label</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(label.labelId)}>
                                        <IconTrash size={18} className="text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
