import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import UserOrderDetails from "@/components/user-orders/UserOrderDetails"




const OrderDetailsPage = () => {
  return (
    <>
    <Header />
    <div className="py-8 mx-auto">
          <UserOrderDetails />
        </div>
    <Footer />
    
    </>
  )
}

export default OrderDetailsPage