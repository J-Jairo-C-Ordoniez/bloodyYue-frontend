"use client"

import { useState, useEffect } from "react"
import useSales from "@/hooks/useSales"
import chatApi from "@/api/chat"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/molecules/Table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/molecules/Select"
import { Badge } from "@/components/atoms/Badge"
import { Button } from "@/components/atoms/Button"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"
import { IconMessage } from "@tabler/icons-react"
import Typography from "../atoms/Typography"
import { useChatStore } from "@/store/chat.store"

export function SalesSection() {
    const { openChat } = useChatStore()
    const {
        sales,
        loading,
        fetchSaleDetails,
        updateDetailsStatus
    } = useSales('salesGetLisGet', { id: 0 })

    const [paidSalesDetails, setPaidSalesDetails] = useState({})
    const [detailsLoading, setDetailsLoading] = useState(false)

    useEffect(() => {
        if (sales && sales.length > 0) {
            const paidSales = sales.filter(s => s.status === 'paid')
            fetchDetailsForPaidSales(paidSales)
        }
    }, [sales])

    const fetchDetailsForPaidSales = async (paidSales) => {
        setDetailsLoading(true)
        const detailsMap = {}
        for (const sale of paidSales) {
            const res = await fetchSaleDetails(sale.saleId)
            if (!res.error) {
                detailsMap[sale.saleId] = res.data
            }
        }
        setPaidSalesDetails(detailsMap)
        setDetailsLoading(false)
    }

    const handleDetailsStatusChange = async (saleId, newStatus) => {
        const response = await updateDetailsStatus(saleId, newStatus)
        if (!response.error) {
            toast.success("Estado de entrega actualizado")
            setPaidSalesDetails(prev => ({
                ...prev,
                [saleId]: { ...prev[saleId], status: newStatus }
            }))
        } else {
            toast.error("Error al actualizar estado de entrega: " + response.message)
        }
    }

    const handleInitiateChat = async (participantId) => {
        const response = await chatApi.chatPost({ participantId })
        if (!response.error) {
            toast.success("Chat abierto")
            const chatId = response.data?.chatId || response.data
            openChat(chatId, "Cliente")
        } else {
            toast.error("Error al iniciar chat: " + response.message)
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'initiated': return <Badge variant="secondary">Iniciada</Badge>
            case 'paid': return <Badge className="bg-green-500/20 text-green-500 border-green-500/50">Pagada</Badge>
            case 'cancelled': return <Badge variant="destructive">Cancelada</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    const getDetailsStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="text-yellow-500 border-yellow-500/50 bg-yellow-500/10">Pendiente</Badge>
            case 'process': return <Badge variant="outline" className="text-blue-500 border-blue-500/50 bg-blue-500/10">En Proceso</Badge>
            case 'done': return <Badge variant="outline" className="text-green-500 border-green-500/50 bg-green-500/10">Completado</Badge>
            default: return <Badge variant="outline">{status || 'Sin estado'}</Badge>
        }
    }

    if (loading && !sales) return <LoaderCard title="Cargando ventas..." />

    return (
        <div className="p-6 space-y-12">
            <section className="space-y-4">
                <Typography variant="subtitle" className="text-white">Transacciones Generales</Typography>
                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader className="bg-zinc-800/50">
                            <TableRow>
                                <TableHead className="text-zinc-400">ID Venta</TableHead>
                                <TableHead className="text-zinc-400">Total</TableHead>
                                <TableHead className="text-zinc-400">Fecha</TableHead>
                                <TableHead className="text-zinc-400">Estado Pago</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales?.map((sale) => (
                                <TableRow key={sale.saleId} className="hover:bg-zinc-800/30 transition-colors">
                                    <TableCell className="font-mono text-xs text-zinc-500">{sale.saleId}</TableCell>
                                    <TableCell className="font-bold text-purple-400">${sale.total}</TableCell>
                                    <TableCell className="text-xs text-zinc-500">{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <Typography variant="subtitle" className="text-white">Control de Entregas (Ventas Pagadas)</Typography>
                    {detailsLoading && <span className="text-xs text-purple-400 animate-pulse">Sincronizando detalles...</span>}
                </div>
                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader className="bg-zinc-800/50">
                            <TableRow>
                                <TableHead className="text-zinc-400">ID Venta</TableHead>
                                <TableHead className="text-zinc-400">Estado Entrega</TableHead>
                                <TableHead className="text-zinc-400">Actualizar Entrega</TableHead>
                                <TableHead className="text-zinc-400">Chat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales?.filter(s => s.status === 'paid').map((sale) => {
                                const details = paidSalesDetails[sale.saleId]
                                return (
                                    <TableRow key={`details-${sale.saleId}`} className="hover:bg-zinc-800/30 transition-colors">
                                        <TableCell className="font-mono text-xs text-zinc-500">{sale.saleId}</TableCell>
                                        <TableCell>{getDetailsStatusBadge(details?.status)}</TableCell>
                                        <TableCell>
                                            {details ? (
                                                <div>
                                                    <Select
                                                        defaultValue={details.status || 'pending'}
                                                        onValueChange={(val) => handleDetailsStatusChange(sale.saleId, val)}
                                                    >
                                                        <SelectTrigger className="w-[140px] h-9 bg-zinc-800 border-zinc-700 text-xs text-zinc-300">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                                            <SelectItem value="pending">Pendiente</SelectItem>
                                                            <SelectItem value="process">En Proceso</SelectItem>
                                                            <SelectItem value="done">Completado</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-zinc-600">Cargando...</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" title="Hablar con el cliente" onClick={() => handleInitiateChat(details?.userId)} className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20">
                                                <IconMessage size={18} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {sales?.filter(s => s.status === 'paid').length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-zinc-500 text-sm">
                                        No hay productos pagados pendientes de entrega.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    )
}
