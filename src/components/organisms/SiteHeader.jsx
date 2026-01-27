import { Separator } from "@/components/atoms/Separator"
import { SidebarTrigger } from "@/components/molecules/Sidebar"
import Typography from "../atoms/Typography";

export default function SiteHeader() {
  return (
    <header
      className="py-4 flex h-(--header-height) bg-[#0B0B0E] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Typography variant="small" className="text-base font-medium text-zinc-300 uppercase">Admin Dashboard</Typography>
      </div>
    </header>
  );
}
