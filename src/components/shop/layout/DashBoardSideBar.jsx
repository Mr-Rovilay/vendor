import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderPlus,
  Tag,
  FilePlus,
  Wallet,
  MessageSquare,
  Gift,
  RefreshCcw,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
const sidebarItems = [
  {
    id: 1,
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    icon: ShoppingBag,
    label: "All Orders",
    path: "/dashboard-orders",
  },
  {
    id: 3,
    icon: Package,
    label: "All Products",
    path: "/dashboard-products",
  },
  {
    id: 4,
    icon: FolderPlus,
    label: "Create Product",
    path: "/dashboard-create-product",
  },
  {
    id: 5,
    icon: Tag,
    label: "All Events",
    path: "/dashboard-events",
  },
  {
    id: 6,
    icon: FilePlus,
    label: "Create Event",
    path: "/dashboard-create-event",
  },
  {
    id: 7,
    icon: Wallet,
    label: "Withdraw Money",
    path: "/dashboard-withdraw-money",
  },
  {
    id: 8,
    icon: MessageSquare,
    label: "Shop Inbox",
    path: "/dashboard-messages",
  },
  {
    id: 9,
    icon: Gift,
    label: "Discount Codes",
    path: "/dashboard-coupons",
  },
  {
    id: 10,
    icon: RefreshCcw,
    label: "Refunds",
    path: "/dashboard-refunds",
  },
  {
    id: 11,
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

const SidebarItem = ({ icon: Icon, label, path, isActive }) => {
  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-4",
        isActive && "bg-primary/10 hover:bg-primary/20"
      )}
    >
      <Link to={path}>
        <Icon
          className={cn(
            "h-5 w-5",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        />
        <span
          className={cn(
            "hidden md:inline-block",
            isActive ? "text-primary font-medium" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
      </Link>
    </Button>
  );
};

export default function DashboardSidebar({ active }) {
  return (
    <div className="h-[calc(100vh-4rem)] w-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="w-full h-full p-2">
        <div className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              {...item}
              isActive={active === item.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}