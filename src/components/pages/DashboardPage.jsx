'use client';

import AppSidebar from "../organisms/AppSidebar";
import SettingsSection from "../organisms/SettingsSection";
import SiteHeader from "../organisms/SiteHeader";
import { SectionCards } from "../organisms/SectionCards";
import { ChartAreaInteractive } from "../organisms/ChartAreaInteractive";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { useState } from "react";
import { UsersSection } from "../organisms/UsersSection";
import { RolesSection } from "../organisms/RolesSection";
import { LabelsSection } from "../organisms/LabelsSection";
import { CommissionsManager } from "../organisms/CommissionsManager";
import { PostsManager } from "../organisms/PostsManager";
import { SalesSection } from "../organisms/SalesSection";
import { RecentSalesSummary } from "../organisms/RecentSalesSummary";

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
        <SidebarProvider className="bg-[#0B0B0E]">
            <AppSidebar onSelect={setActiveSection} />
            <SidebarInset className="bg-[#0B0B0E]">
                <SiteHeader />
                <main className="flex flex-1 flex-col overflow-y-auto bg-[#0B0B0E]">
                    {renderSection()}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}