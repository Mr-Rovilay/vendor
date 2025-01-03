import Checkout from "@/components/checkout/Checkout"
import CheckoutSteps from "@/components/checkout/CheckoutSteps"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"

const CheckOutPage = () => {
  return (
    <div>
      <Header />
       
        <CheckoutSteps active={1} />
        <Checkout />
       
        <Footer />
    </div>
  )
}

export default CheckOutPage