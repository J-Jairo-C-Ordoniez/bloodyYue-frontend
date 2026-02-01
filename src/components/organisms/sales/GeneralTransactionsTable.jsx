import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../molecules/Table"
import { Badge } from "../../atoms/Badge"
import Typography from "../../atoms/Typography"

export function GeneralTransactionsTable({ sales, loading }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'initiated': return <Badge variant="secondary">Iniciada</Badge>
            case 'paid': return <Badge className="bg-green-500/20 text-green-500 border-green-500/50">Pagada</Badge>
            case 'cancelled': return <Badge variant="destructive">Cancelada</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    const salesArray = Array.isArray(sales) ? sales : []

    return (
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
                        {salesArray.map((sale) => (
                            <TableRow key={sale.saleId} className="hover:bg-zinc-800/30 transition-colors">
                                <TableCell className="font-mono text-xs text-zinc-500">{sale.saleId}</TableCell>
                                <TableCell className="font-bold text-purple-400">${sale.total}</TableCell>
                                <TableCell className="text-xs text-zinc-500">{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{getStatusBadge(sale.status)}</TableCell>
                            </TableRow>
                        ))}
                        {salesArray.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-zinc-500">
                                    No se encontraron ventas registradas.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
