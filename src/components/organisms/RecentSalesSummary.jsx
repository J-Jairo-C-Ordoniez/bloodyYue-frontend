"use client"

import { useState, useEffect } from "react"
import salesApi from "@/api/sales"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"

export function RecentSalesSummary() {
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSales = async () => {
            const response = await salesApi.salesGetList()
            if (!response.error) {
                // Just take the latest 5
                setSales(response.data.slice(0, 5))
            }
            setLoading(false)
        }
        fetchSales()
    }, [])

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    Latest transactions on the platform
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">Loading...</TableCell>
                            </TableRow>
                        ) : sales.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">No sales found</TableCell>
                            </TableRow>
                        ) : (
                            sales.map((sale) => (
                                <TableRow key={sale.idSale}>
                                    <TableCell>
                                        <div className="font-medium text-xs truncate max-w-[100px]">{sale.user?.name || 'Anonymous'}</div>
                                    </TableCell>
                                    <TableCell className="text-right text-xs">
                                        ${parseFloat(sale.total).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right text-xs text-muted-foreground">
                                        {format(new Date(sale.createdAt), 'MMM dd')}
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
