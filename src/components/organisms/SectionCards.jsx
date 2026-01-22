"use client"

import { useState, useEffect } from "react"
import salesApi from "@/api/sales"
import usersApi from "@/api/users"
import { IconTrendingUp, IconUsers, IconCurrencyDollar, IconShoppingCart } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    newCustomers: 0,
    activeAccounts: 0,
    totalSales: 0
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      const [salesRes, usersRes] = await Promise.all([
        salesApi.salesGetList(),
        usersApi.usersGet()
      ])

      if (!salesRes.error && !usersRes.error) {
        const totalRevenue = salesRes.data.reduce((acc, s) => acc + (parseFloat(s.total) || 0), 0)
        const activeAccounts = usersRes.data.filter(u => u.status === 'active').length

        setMetrics({
          totalRevenue: totalRevenue.toFixed(2),
          newCustomers: usersRes.data.length, // Simplified
          activeAccounts: activeAccounts,
          totalSales: salesRes.data.length
        })
      }
    }
    fetchMetrics()
  }, [])

  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${metrics.totalRevenue}
          </CardTitle>
          <CardAction>
            <IconCurrencyDollar className="text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Cumulative earnings</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.newCustomers}
          </CardTitle>
          <CardAction>
            <IconUsers className="text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Registered on platform</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
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
          <div className="text-muted-foreground">Users with active status</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.totalSales}
          </CardTitle>
          <CardAction>
            <IconShoppingCart className="text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Successful transactions</div>
        </CardFooter>
      </Card>
    </div>
  );
}
