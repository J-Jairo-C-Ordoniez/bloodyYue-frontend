'use client';

import { AppSidebar } from "@/components/organisms/AppSidebar"
import { SiteHeader } from "@/components/organisms/SiteHeader"
import { SectionCards } from "@/components/organisms/SectionCards"
import { DataTable } from "@/components/organisms/DataTable"
import { ChartAreaInteractive } from "@/components/organisms/ChartAreaInteractive"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// Sample data for the DataTable
const dashboardData = [
    {
        id: 1,
        header: "Q1 Financial Review",
        type: "Executive Summary",
        status: "Done",
        target: "$50,000",
        limit: "$45,000",
        reviewer: "Eddie Lake",
    },
    {
        id: 2,
        header: "Marketing Strategy",
        type: "Narrative",
        status: "In Progress",
        target: "$20,000",
        limit: "$25,000",
        reviewer: "Jamik Tashpulatov",
    },
    {
        id: 3,
        header: "Product Roadmap",
        type: "Technical Approach",
        status: "Not Started",
        target: "N/A",
        limit: "N/A",
        reviewer: "Assign reviewer",
    },
    {
        id: 4,
        header: "Employee Handbook",
        type: "Focus Documents",
        status: "Done",
        target: "N/A",
        limit: "N/A",
        reviewer: "Emily Whalen",
    },
    {
        id: 5,
        header: "Q2 Budget Planning",
        type: "Table of Contents",
        status: "In Progress",
        target: "$60,000",
        limit: "$55,000",
        reviewer: "Eddie Lake",
    },
];

export default function DashboardPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <SectionCards />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <ChartAreaInteractive />
                        {/* 
                            Placeholder for potentially another chart or component 
                            to balance the grid if needed. 
                            For now, we can leave it or let Chart take full width if needed,
                            but user asked for best placement. 
                            Let's keep the chart in a grid area.
                        */}
                    </div>
                    <DataTable data={dashboardData} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}