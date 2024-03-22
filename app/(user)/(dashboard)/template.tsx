import Menu from "@/components/main/Menu";
import { Sidebar } from "@/components/main/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
  
      <Menu />
      <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:flex lg:flex-col lg:justify-between  h-screen -mt-16" />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
          <ScrollArea className="h-[calc(100%-4rem)]">

            {children}
            </ScrollArea>
            </div>
        </div>
      </div>
    </div>
  );
}
