import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";


const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {

  return (
    <div className="max-w-4xl px-4 py-16 mx-auto">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <motion.div
            className="flex items-center justify-center w-32 h-32 bg-green-100 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
              <span className="text-lg text-white">✓</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12 space-y-4 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Order Successfully Placed! 🎉</h1>
        <p className="text-gray-600">Thank you for your purchase. We&#39;ll send you updates about your order.</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col justify-center gap-4 sm:flex-row"
      >
        <Link to={"/products"}>
        
        <Button variant="outline">
          Continue Shopping
        </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;