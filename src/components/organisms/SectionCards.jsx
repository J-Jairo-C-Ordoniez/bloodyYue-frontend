"use client"

import { useState, useEffect } from "react"
import { IconTrendingUp, IconUsers, IconCurrencyDollar, IconShoppingCart } from "@tabler/icons-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import salesApi from "../../api/sales/index"
import usersApi from "../../api/users/index"

export default function SectionCards() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    newCustomers: 0,
    activeAccounts: 0,
    totalSales: 0
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      const [salesRes, usersRes] = await Promise.all([
        salesApi.salesGetLisGet({id: 0}),
        usersApi.usersGet()
      ])

      if (!salesRes.error && !usersRes.error) {
        const totalRevenue = salesRes.data.reduce((acc, s) => acc + (s.status === 'paid' ? (parseFloat(s.total)) : 0), 0)
        const activeAccounts = usersRes.data.filter(u => u.status === 'active').length

        setMetrics({
          totalRevenue: totalRevenue.toFixed(2),
          newCustomers: usersRes.data.length,
          activeAccounts: activeAccounts,
          totalSales: salesRes.data.length
        })
      }
    }
    fetchMetrics()
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ganancias totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${metrics.totalRevenue}
          </CardTitle>
          <CardAction>
            <IconCurrencyDollar className="text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <span className="text-muted-foreground">Ganancias acumuladas</span>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Usuarios totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.newCustomers}
          </CardTitle>
          <CardAction>
            <IconUsers className="text-primary" />
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Usuarios activos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.activeAccounts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-3 mr-1" />
              Live
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <span className="text-muted-foreground">Usuarios con estado activo</span>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de ventas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.totalSales}
          </CardTitle>
          <CardAction>
            <IconShoppingCart className="text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <span className="text-muted-foreground">Transacciones exitosas</span>
        </CardFooter>
      </Card>
    </div>
  );
}
