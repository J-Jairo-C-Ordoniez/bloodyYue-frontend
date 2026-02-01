"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../molecules/Table"
import { format } from "date-fns"
import useSales from "../../hooks/useSales"
import Label from "../atoms/Label"
import useAuthStore from "../../store/auth.store"

export default function RecentSalesSummary() {
    const { user } = useAuthStore()
    const { sales, loading, error } = useSales('salesGetLisGet', { id: user?.userId || 0 })

    const salesArray = Array.isArray(sales) ? sales : []
    const recentSales = salesArray.slice(0, 5)

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>
                    Transacciones recientes en la plataforma
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                            <TableHead className="text-right">Metodo de pago</TableHead>
                            <TableHead className="text-right">Fecha</TableHead>
                            <TableHead className="text-right">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-xs text-muted-foreground">Cargando...</TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-xs text-red-500/70 italic border border-red-500/10 bg-red-500/5">
                                    Error: {error}
                                </TableCell>
                            </TableRow>
                        ) : recentSales.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-xs text-muted-foreground">No hay ventas registradas</TableCell>
                            </TableRow>
                        ) : (
                            recentSales.map((sale) => (
                                <TableRow key={sale.saleId}>
                                    <TableCell className="w-[100px]">
                                        <span className="font-medium text-[10px] font-mono truncate max-w-[80px] block text-muted-foreground">{sale.saleId}</span>
                                    </TableCell>
                                    <TableCell className="text-right text-xs font-semibold text-purple-400">
                                        ${parseFloat(sale.total).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right text-[10px] text-muted-foreground">
                                        {sale.paymentMethod}
                                    </TableCell>
                                    <TableCell className="text-right text-[10px] text-muted-foreground">
                                        {format(new Date(sale.createdAt), 'MMM dd')}
                                    </TableCell>
                                    <TableCell className="flex justify-end items-center">
                                        <Label variant="default" color={`${sale.status === 'paid' ? '#00cc00' : sale.status === 'cancelled' ? '#ff3333' : '#ffcc00'}`}>
                                            <span className="capitalize">{sale.status}</span>
                                        </Label>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
