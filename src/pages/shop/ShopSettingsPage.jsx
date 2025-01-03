import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar";
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader";
import ShopSettings from "@/components/shop/ShopSettings";

const ShopSettingsPage = () => {
  return (
    <>
      <ShopDashBoardHeader />
      <div className="flex">
        <div className="w-[60px] md:w-[300px] fixed top-16 bottom-0">
          <DashboardSidebar active={11} />
        </div>
        <div className="flex-1 ml-[60px] md:ml-[300px] pt-4 overflow-y-auto">
          <ShopSettings />
        </div>
      </div>
    </>
  );
};

export default ShopSettingsPage;
