'use client';

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
import { Badge } from "@/components/atoms/Badge"
import { Button } from "@/components/atoms/Button"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"
import ErrorCard from "@/components/molecules/ErrorCard"
import { IconMessage, IconShoppingBag } from "@tabler/icons-react"
import Typography from "../atoms/Typography"
import { useChatStore } from "@/store/chat.store"

export default function PurchasesList() {
    const { openChat } = useChatStore()
    const {
        sales,
        loading,
        error,
        fetchSaleDetails
    } = useSales('salesMeGet')

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

    const handleInitiateChat = async (participantId) => {
        if (!participantId) {
            toast.error("No se pudo identificar al vendedor")
            return
        }
        const response = await chatApi.chatPost({ participantId })
        if (!response.error) {
            toast.success("Chat abierto")
            const chatId = response.data?.chatId || response.data
            const participantName = response.data?.participantName || "Vendedor"
            openChat(chatId, participantName)
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

    if (loading && (!sales || sales.length === 0)) return <LoaderCard title="Cargando tus compras..." />

    if (error) {
        return (
            <div className="py-6">
                <ErrorCard message={error} />
            </div>
        )
    }

    if (!sales || sales.length === 0) {
        return (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
                <IconShoppingBag size={48} className="mx-auto text-zinc-700 mb-4" />
                <p className="text-zinc-500 font-medium">No has realizado ninguna compra aún.</p>
            </div>
        )
    }

    return (
        <div className="space-y-12 pb-10">
            <section className="space-y-4">
                <Typography variant="subtitle" className="text-white">Historial de Compras</Typography>
                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader className="bg-zinc-800/50">
                            <TableRow>
                                <TableHead className="text-zinc-400">Orden</TableHead>
                                <TableHead className="text-zinc-400">Total</TableHead>
                                <TableHead className="text-zinc-400">Fecha</TableHead>
                                <TableHead className="text-zinc-400">Método</TableHead>
                                <TableHead className="text-zinc-400">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow key={sale.saleId} className="hover:bg-zinc-800/30 transition-colors">
                                    <TableCell className="font-mono text-xs text-zinc-500">#{sale.saleId}</TableCell>
                                    <TableCell className="font-bold text-purple-400">${sale.total}</TableCell>
                                    <TableCell className="text-xs text-zinc-500">{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-xs text-zinc-500 capitalize">{sale.paymentMethod || 'PayPal'}</TableCell>
                                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <Typography variant="subtitle" className="text-white">Seguimiento de Pedidos (Pagados)</Typography>
                    {detailsLoading && <span className="text-xs text-purple-400 animate-pulse">Sincronizando seguimiento...</span>}
                </div>
                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader className="bg-zinc-800/50">
                            <TableRow>
                                <TableHead className="text-zinc-400">Orden</TableHead>
                                <TableHead className="text-zinc-400">Estado de Entrega</TableHead>
                                <TableHead className="text-zinc-400">Soporte/Chat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales.filter(s => s.status === 'paid').map((sale) => {
                                const details = paidSalesDetails[sale.saleId]
                                // For the buyer, we try to get the seller ID from the details.
                                // In SalesSection (seller view), details.userId was the buyer.
                                // If the backend is consistent, we might need a different field for the seller,
                                // or the backend might return the counterparty in userId depending on the context.
                                const participantId = details?.commission?.userId || details?.userId;

                                return (
                                    <TableRow key={`tracking-${sale.saleId}`} className="hover:bg-zinc-800/30 transition-colors">
                                        <TableCell className="font-mono text-xs text-zinc-500">#{sale.saleId}</TableCell>
                                        <TableCell>{getDetailsStatusBadge(details?.status)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title={details?.status === 'done' ? "Soporte finalizado" : "Contactar vendedor"}
                                                onClick={() => handleInitiateChat(participantId)}
                                                disabled={details?.status === 'done'}
                                                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 disabled:opacity-30 disabled:grayscale"
                                            >
                                                <IconMessage size={18} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {sales.filter(s => s.status === 'paid').length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-zinc-500 text-sm">
                                        No tienes productos pagados en seguimiento.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    );
}
