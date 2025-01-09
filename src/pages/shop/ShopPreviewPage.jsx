import ShopProfileData from "@/components/profile/ShopProfileData";
import ShopInfo from "@/components/shop/ShopInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";


export default function ShopPreviewPage() { 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="py-8 max-pad-container">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Shop Info Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-0">
              <ScrollArea className="h-[calc(100vh-8rem)] rounded-lg border bg-card">
                <ShopInfo isOwner={false} />
              </ScrollArea>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 lg:w-3/4">
            <div className="rounded-lg bg-card">
              <ShopProfileData isOwner={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}