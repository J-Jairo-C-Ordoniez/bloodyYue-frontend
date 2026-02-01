import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../molecules/Table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../molecules/Select"
import { Badge } from "../../atoms/Badge"
import { Button } from "../../atoms/Button"
import { IconMessage } from "@tabler/icons-react"
import Typography from "../../atoms/Typography"

export function DeliveryControlTable({ sales, salesDetails, onStatusChange, onInitiateChat, detailsLoading }) {
    const getDetailsStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="text-yellow-500 border-yellow-500/50 bg-yellow-500/10">Pendiente</Badge>
            case 'process': return <Badge variant="outline" className="text-blue-500 border-blue-500/50 bg-blue-500/10">En Proceso</Badge>
            case 'done': return <Badge variant="outline" className="text-green-500 border-green-500/50 bg-green-500/10">Completado</Badge>
            default: return <Badge variant="outline">{status || 'Sin estado'}</Badge>
        }
    }

    const paidSales = Array.isArray(sales) ? sales.filter(s => s.status === 'paid') : []

    return (
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
                        {paidSales.map((sale) => {
                            const details = salesDetails[sale.saleId]
                            return (
                                <TableRow key={`details-${sale.saleId}`} className="hover:bg-zinc-800/30 transition-colors">
                                    <TableCell className="font-mono text-xs text-zinc-500">{sale.saleId}</TableCell>
                                    <TableCell>{getDetailsStatusBadge(details?.status)}</TableCell>
                                    <TableCell>
                                        {details ? (
                                            <div>
                                                <Select
                                                    defaultValue={details.status || 'pending'}
                                                    onValueChange={(val) => onStatusChange(sale.saleId, val)}
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
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title={details?.status === 'done' ? "Venta finalizada" : "Hablar con el cliente"}
                                            onClick={() => onInitiateChat(details?.userId)}
                                            disabled={details?.status === 'done'}
                                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 disabled:opacity-30 disabled:grayscale"
                                        >
                                            <IconMessage size={18} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {paidSales.length === 0 && (
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
    )
}
