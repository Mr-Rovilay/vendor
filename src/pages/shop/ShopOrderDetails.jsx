import Footer from "@/components/footer/Footer"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"
import OrderDetails from "@/components/shop/order-details/OrderDetails"


const ShopOrderDetails = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="py-8 mx-auto">

    <OrderDetails/>
    </div>
    <Footer/>

</div>
  )
}

export default ShopOrderDetails