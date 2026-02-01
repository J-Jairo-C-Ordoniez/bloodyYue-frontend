import { useState, useEffect } from "react"
import useSales from "../../hooks/useSales"
import useChats from "../../hooks/useChats"
import { GeneralTransactionsTable } from "./sales/GeneralTransactionsTable"
import { DeliveryControlTable } from "./sales/DeliveryControlTable"
import { Button } from "../atoms/Button"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"
import Typography from "../atoms/Typography"
import { useChatStore } from "../../store/chat.store"

export function SalesSection() {
    const { openChat } = useChatStore()
    const {
        sales,
        loading: salesLoading,
        error,
        fetchSaleDetails,
        updateDetailsStatus
    } = useSales('salesGetLisGet', { id: 0 })

    const { createChat } = useChats('none')

    const [paidSalesDetails, setPaidSalesDetails] = useState({})
    const [detailsLoading, setDetailsLoading] = useState(false)

    useEffect(() => {
        if (sales && sales.length > 0) {
            const paidSales = sales.filter(s => s.status === 'paid')
            const unLoadedPaidSales = paidSales.filter(s => !paidSalesDetails[s.saleId])
            if (unLoadedPaidSales.length > 0) {
                fetchDetailsForPaidSales(unLoadedPaidSales)
            }
        }
    }, [sales])

    const fetchDetailsForPaidSales = async (paidSales) => {
        setDetailsLoading(true)
        const detailsMap = { ...paidSalesDetails }
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
        const response = await createChat({ participantId })
        if (!response.error) {
            toast.success("Chat abierto")
            const chatId = response.data?.chatId || response.data
            const participantName = response.data?.participantName || "Cliente"
            openChat(chatId, participantName)
        } else {
            toast.error("Error al iniciar chat: " + response.message)
        }
    }

    const salesArray = Array.isArray(sales) ? sales : []

    if (salesLoading && salesArray.length === 0) return <LoaderCard title="Cargando ventas..." />

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl mb-4">
                    <Typography className="text-red-500 font-bold">Error al cargar ventas:</Typography>
                    <Typography className="text-red-400 text-sm">{error}</Typography>
                </div>
                <Button onClick={() => window.location.reload()} variant="outline">Reintentar</Button>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-12">
            <GeneralTransactionsTable sales={salesArray} loading={salesLoading} />

            <DeliveryControlTable
                sales={salesArray}
                salesDetails={paidSalesDetails}
                onStatusChange={handleDetailsStatusChange}
                onInitiateChat={handleInitiateChat}
                detailsLoading={detailsLoading}
            />
        </div>
    )
}
