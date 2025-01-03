import CheckoutSteps from "@/components/checkout/CheckoutSteps"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import Payment from "@/components/payment/Payment"



const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
    <Header />
    <CheckoutSteps active={2} />
    <Payment />
    <Footer />
 </div>

  )
}

export default PaymentPage