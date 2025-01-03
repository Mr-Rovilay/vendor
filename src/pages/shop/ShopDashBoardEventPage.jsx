import CreateEvent from "@/components/profile/CreateEvent";
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar";
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader";


const ShopDashBoardEventPage = () => {
  return (
    <div>
      {/* Header */}
      <ShopDashBoardHeader />

      {/* Main layout */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="w-[60px] md:w-[330px] fixed top-16 bottom-0">
          <DashboardSidebar active={6} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 ml-[60px] md:ml-[330px] pt-4 overflow-y-auto">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopDashBoardEventPage;
