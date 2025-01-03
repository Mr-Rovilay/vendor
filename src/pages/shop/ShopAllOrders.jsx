import AllOrders from "@/components/shop/AllOrders";
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar";
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader";


const ShopAllOrders = () => {
  return (
    <div>
      <ShopDashBoardHeader />
      <div className="flex">
        <div className="w-[60px] md:w-[300px] fixed top-16 bottom-0">
          <DashboardSidebar active={2} />
        </div>
        <div className="flex-1 ml-[60px] md:ml-[300px] pt-4 overflow-y-auto">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
