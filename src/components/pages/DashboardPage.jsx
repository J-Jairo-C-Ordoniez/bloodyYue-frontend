'use client';

import { AppSidebar } from "@/components/organisms/AppSidebar"
import { SiteHeader } from "@/components/organisms/SiteHeader"
import { SectionCards } from "@/components/organisms/SectionCards"
import { ChartAreaInteractive } from "@/components/organisms/ChartAreaInteractive"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"
import { SettingsSection } from "@/components/organisms/SettingsSection"
import { UsersSection } from "@/components/organisms/UsersSection"
import { RolesSection } from "@/components/organisms/RolesSection"
import { LabelsSection } from "@/components/organisms/LabelsSection"
import { CommissionsManager } from "@/components/organisms/CommissionsManager"
import { PostsManager } from "@/components/organisms/PostsManager"
import { SalesSection } from "@/components/organisms/SalesSection"
import { RecentSalesSummary } from "@/components/organisms/RecentSalesSummary"

export default function DashboardPage() {
    const [activeSection, setActiveSection] = useState('metrics');

    const renderSection = () => {
        switch (activeSection) {
            case 'metrics':
                return (
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <SectionCards />
                        <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-3 lg:px-2">
                            <div className="flex flex-col gap-4 @5xl/main:col-span-2">
                                <ChartAreaInteractive />
                            </div>
                            <div className="flex flex-col gap-4">
                                <RecentSalesSummary />
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return <SettingsSection />;
            case 'users':
                return <UsersSection />;
            case 'roles':
                return <RolesSection />;
            case 'labels':
                return <LabelsSection />;
            case 'commissions':
                return <CommissionsManager />;
            case 'posts':
                return <PostsManager />;
            case 'sales-history':
                return <SalesSection />;
            case 'chats':
                return <div className="p-4 text-white font-medium">Chat Messaging Interface (Coming Soon)</div>;
            default:
                return (
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <SectionCards />
                        <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-3 lg:px-2">
                            <div className="flex flex-col gap-4 @5xl/main:col-span-2">
                                <ChartAreaInteractive />
                            </div>
                            <div className="flex flex-col gap-4">
                                <RecentSalesSummary />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar onSelect={setActiveSection} />
            <SidebarInset>
                <SiteHeader />
                <main className="flex flex-1 flex-col overflow-y-auto">
                    {renderSection()}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}