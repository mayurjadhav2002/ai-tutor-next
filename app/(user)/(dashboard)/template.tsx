import Menu from "@/components/main/Menu";
import { Sidebar } from "@/components/main/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div > {/* Add relative positioning and z-index to create stacking context */}
      <Menu />
      <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:flex lg:flex-col lg:justify-between h-screen -mt-16 z-20" /> {/* Increase z-index to place sidebar above other elements */}
        <div className="col-span-3 lg:col-span-4 lg:border-l relative z-0"> {/* Add relative positioning and reset z-index */}
          <div className="h-full px-4 lg:px-8">
            <ScrollArea className="h-[calc(100%-5rem)] pt-5">{children}</ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
