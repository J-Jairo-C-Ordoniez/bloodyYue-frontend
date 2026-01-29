"use client"

import { useMemo } from "react"
import { IconTrendingUp, IconUsers, IconCurrencyDollar, IconShoppingCart } from "@tabler/icons-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/molecules/Card"
import { Badge } from "@/components/atoms/Badge"
import useSales from "@/hooks/useSales"
import useUsers from "@/hooks/useUsers"
import useAuthStore from "@/store/auth.store"

export default function SectionCards() {
  const { user } = useAuthStore()
  const { sales, loading: salesLoading, error: salesError } = useSales('salesGetLisGet', { id: user?.userId || 0 })
  const { userData: users, loading: usersLoading } = useUsers('usersGet')

  const metrics = useMemo(() => {
    const salesArray = Array.isArray(sales) ? sales : []
    const usersArray = Array.isArray(users) ? users : []

    if (salesArray.length === 0 && usersArray.length === 0) return {
      totalRevenue: 0,
      newCustomers: 0,
      activeAccounts: 0,
      totalSales: 0
    }

    const totalRevenue = salesArray.reduce((acc, s) => acc + (s.status === 'paid' ? (parseFloat(s.total)) : 0), 0)
    const activeAccounts = usersArray.filter(u => u.status === 'active').length

    return {
      totalRevenue: totalRevenue.toFixed(2),
      newCustomers: usersArray.length,
      activeAccounts: activeAccounts,
      totalSales: salesArray.length
    }
  }, [sales, users])

  const isLoading = salesLoading || usersLoading
  const hasError = salesError

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ganancias totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : `$${metrics.totalRevenue}`}
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
            {isLoading ? "..." : metrics.newCustomers}
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
            {isLoading ? "..." : metrics.activeAccounts}
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
            {isLoading ? "..." : metrics.totalSales}
          </CardTitle>
          <CardAction>
            <IconShoppingCart className="text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <span className="text-muted-foreground">Transacciones totales</span>
        </CardFooter>
      </Card>
    </div>
  );
}
