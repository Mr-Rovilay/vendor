import DashboardMessages from "@/components/shop/DashboardMessages";
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar";
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader";

export const ShopInBoxPage = () => {
  return (
    <div>
      {/* Header */}
      <ShopDashBoardHeader />
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="w-[60px] md:w-[300px] fixed top-16 bottom-0">
          <DashboardSidebar active={8} />
        </div>
        <div className="flex-1 ml-[60px] md:ml-[300px] pt-4 overflow-y-auto">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
};
