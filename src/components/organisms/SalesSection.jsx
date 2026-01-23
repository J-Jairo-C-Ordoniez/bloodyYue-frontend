"use client"

import { useState, useEffect } from "react"
import salesApi from "@/api/sales"
import chatApi from "@/api/chat"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"
import { IconMessage, IconArrowRight } from "@tabler/icons-react"

export function SalesSection() {
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSales()
    }, [])

    const fetchSales = async () => {
        setLoading(true)
        const response = await salesApi.salesGetLisGet({id: 0})
        if (!response.error) {
            setSales(response.data)
        } else {
            toast.error("Failed to load sales: " + response.message)
        }
        setLoading(false)
    }

    const handleStatusChange = async (saleId, newStatus) => {
        const response = await salesApi.salesStatusPatch({ id: saleId, status: newStatus })
        if (!response.error) {
            toast.success("Sale status updated")
            setSales(prev => prev.map(s => s.saleId === saleId ? { ...s, status: newStatus } : s))
        } else {
            toast.error("Update failed: " + response.message)
        }
    }

    const handleInitiateChat = async (userId) => {
        const response = await chatApi.chatPost({ userId })
        if (!response.error) {
            toast.success("Chat room created/opened")
            // Navigation to chat or opening a chat widget would happen here
        } else {
            toast.error("Failed to initiate chat: " + response.message)
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'initiated': return <Badge variant="secondary">Initiated</Badge>
            case 'paid': return <Badge className="bg-green-500/20 text-green-500">Paid</Badge>
            case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    if (loading) return <LoaderCard title="Loading Sales..." />

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-white">Sales & Sales History</h2>
            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Sale ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.saleId}>
                                <TableCell className="font-mono text-xs">{sale.saleId}</TableCell>
                                <TableCell>{sale.userName || "Customer #" + sale.userId}</TableCell>
                                <TableCell className="font-semibold text-primary">${sale.total}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{getStatusBadge(sale.status)}</TableCell>
                                <TableCell className="text-right flex items-center justify-end gap-2">
                                    <Select
                                        defaultValue={sale.status}
                                        onValueChange={(val) => handleStatusChange(sale.saleId, val)}
                                    >
                                        <SelectTrigger className="w-[110px] h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="initiated">Initiated</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="ghost" size="icon" title="Chat with user" onClick={() => handleInitiateChat(sale.userId)}>
                                        <IconMessage size={18} className="text-primary" />
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
