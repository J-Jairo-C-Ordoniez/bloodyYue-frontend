"use client"

import { useState, useEffect, useMemo } from "react"
import { useIsMobile } from "../../hooks/use-mobile"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../molecules/Chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../molecules/Select"
import { ToggleGroup, ToggleGroupItem } from "../molecules/ToggleGroup"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import useSales from "../../hooks/useSales"

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--primary)",
  }
}

export default function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState("30d")
  const { sales } = useSales('salesGetLisGet', { id: 0 })

  const chartData = useMemo(() => {
    if (!sales) return []

    const grouped = sales.reduce((acc, sale) => {
      if (sale.status !== 'paid') return acc

      const date = new Date(sale.createdAt).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + parseFloat(sale.total)
      return acc
    }, {})

    return Object.keys(grouped).map(date => ({
      date,
      amount: grouped[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [sales])

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = useMemo(() => {
    const now = new Date()
    let daysToSubtract = 30
    if (timeRange === "90d") daysToSubtract = 90
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date()
    startDate.setDate(now.getDate() - daysToSubtract)

    return chartData.filter(item => new Date(item.date) >= startDate)
  }, [chartData, timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Ventas a lo largo del tiempo</CardTitle>
        <CardDescription>
          Visualización de ingresos diarios
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4 @[767px]/card:flex">
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full text-foreground">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });
                  }}
                  indicator="dot" />
              } />
            <Area
              dataKey="amount"
              type="monotone"
              fill="url(#fillSales)"
              stroke="var(--primary)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
