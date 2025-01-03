import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Send, 
  Copyright 
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { footercompanyLinks, footerProductLinks, footerSupportLinks } from "@/static/data";


const Footer = () => {
  return (
    <footer className="text-white bg-black">
      {/* Newsletter Section */}
      <div className="py-5 bg-primary max-pad-container">
        <div className="flex flex-col items-center justify-between mx-auto space-y-6 md:flex-row md:space-y-0">
          <div className="md:w-2/5">
            <h2 className="text-2xl font-bold md:text-2xl">
              <span className="text-green-400">Subscribe</span> to Our Newsletter
            </h2>
            <p className="mt-2 text-gray-200">
              Get the latest news, events, and exclusive offers
            </p>
          </div>
          
          <div className="flex w-full md:w-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow mr-2 text-black"
            />
            <Button type="submit">
              <Send className="mr-2" size={20} /> Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-pad-container">
        <div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-4">
          {/* Company Info Column */}
          <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="text-xl font-bold sm:text-2xl">
            Multi Vendor
          </Link>
            <p className="mb-6 text-center text-gray-300 md:text-left">
              The home and elements needed to create beautiful products.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link to="#" className="transition-colors hover:text-green-500">
                <Facebook size={24} />
              </Link>
              <Link to="#" className="transition-colors hover:text-green-500">
                <Twitter size={24} />
              </Link>
              <Link to="#" className="transition-colors hover:text-green-500">
                <Instagram size={24} />
              </Link>
              <Link to="#" className="transition-colors hover:text-green-500">
                <Youtube size={24} />
              </Link>
            </div>
          </div>

          {/* Footer Link Columns */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerProductLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.link} 
                    className="text-gray-300 transition-colors hover:text-green-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Shop</h3>
            <ul className="space-y-2">
              {footercompanyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.link} 
                    className="text-gray-300 transition-colors hover:text-green-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              {footerSupportLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.link} 
                    className="text-gray-300 transition-colors hover:text-green-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-5 border-t border-gray-800 ">
          <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
            <div className="flex items-center text-gray-400">
              <Copyright size={16} className="mr-2" />
              <span>© {new Date().getFullYear()} Multi Vendor. All rights reserved.</span>
            </div>
            
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white">Terms</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            </div>
            
            <img
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt="Payment Methods"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;