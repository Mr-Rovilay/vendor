import AllProducts from "@/components/shop/AllProducts"
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"



const ShopAllProducts = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex">
    <div className="w-[60px] md:w-[330px] fixed top-16 bottom-0">
    <DashboardSidebar active={3}/>
  </div>
  <div className="flex-1 ml-[60px] md:ml-[330px] pt-4 overflow-y-auto">
    <AllProducts/>
  </div>
</div>
</div>
  )
}

export default ShopAllProducts