"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { format } from "date-fns"
import salesApi from "../../api/sales"
import Label from "../atoms/Label"

export default function RecentSalesSummary() {
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSales = async () => {
            const response = await salesApi.salesGetLisGet({id: 0})
            if (!response.error) {
                setSales(response.data)
            }

            setLoading(false)
        }
        fetchSales()
    }, [])

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
                                <TableCell colSpan={4} className="text-center py-4">Cargando...</TableCell>
                            </TableRow>
                        ) : sales.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">No se encontraron ventas</TableCell>
                            </TableRow>
                        ) : (
                            sales.map((sale) => (
                                <TableRow key={sale.saleId}>
                                    <TableCell className="w-[100px]">
                                        <span className="font-medium text-xs truncate max-w-[100px]">{sale.saleId}</span>
                                    </TableCell>
                                    <TableCell className="text-right text-xs">
                                        ${parseFloat(sale.total).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right text-xs">
                                        {sale.paymentMethod}
                                    </TableCell>
                                    <TableCell className="text-right text-xs text-muted-foreground">
                                        {format(new Date(sale.createdAt), 'MMM dd')}
                                    </TableCell>
                                    <TableCell className="flex justify-end items-center">
                                        <Label variant="default" color={`${sale.status === 'paid' ? '#009900' : sale.status === 'cancelled' ? '#FF0000' :'#FFFF00'}`}>
                                            {sale.status}
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
