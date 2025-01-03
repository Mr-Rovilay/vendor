import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Globe, 
  Star 
} from "lucide-react";
import { Button } from "../ui/button";


const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      <div className="grid items-center gap-8 px-4 py-16 mx-auto max-pad-container md:gap-12 lg:py-24 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-block px-4 py-2 mx-auto text-sm font-medium text-blue-800 bg-blue-100 rounded-full lg:mx-0">
            #1 Multi-Vendor Marketplace
          </div>
          
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl xl:text-6xl">
            Discover Unique Products from Multiple Sellers
          </h1>
          
          <p className="max-w-xl mx-auto text-base text-gray-600 md:text-lg lg:mx-0">
            Connect with top-quality sellers, find amazing products, and enjoy a seamless shopping experience across hundreds of categories.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center space-x-4 lg:justify-start">
            <Button asChild variant="default" size="lg">
              <Link to="/products" className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" /> Shop Now
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Right Content - Image and Features */}
        <div className="relative mt-10 lg:mt-0">
          {/* Hero Image */}
          <div className="relative w-full max-w-xl mx-auto overflow-hidden transition-transform duration-300 transform bg-blue-100 shadow-2xl rounded-xl lg:rotate-3 hover:rotate-0">
            <img 
              src="/green-girl.avif" 
              alt="Marketplace Hero" 
              className="object-cover w-full h-auto"
            />
          </div>
          
          {/* Floating Feature Cards */}
          <div className="hidden lg:block">
            <div className="absolute space-y-4 -top-10 -left-10">
              <div className="flex items-center p-3 space-x-3 transition-transform transform bg-white shadow-lg rounded-xl -rotate-6 hover:rotate-0">
                <Globe className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-gray-800">Global Sellers</span>
              </div>
              
              <div className="flex items-center p-3 space-x-3 transition-transform transform bg-white shadow-lg rounded-xl rotate-3 hover:rotate-0">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-800">Verified Sellers</span>
              </div>
            </div>
          </div>

          {/* Mobile Feature Cards */}
          <div className="flex justify-center mt-6 space-x-4 lg:hidden">
            <div className="flex items-center p-3 space-x-3 bg-white shadow-lg rounded-xl">
              <Globe className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-800">Global Sellers</span>
            </div>
            
            <div className="flex items-center p-3 space-x-3 bg-white shadow-lg rounded-xl">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-800">Verified Sellers</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -z-10 opacity-50 rounded-bl-[100px] hidden lg:block"></div>
    </div>
  );
};

export default HeroSection;