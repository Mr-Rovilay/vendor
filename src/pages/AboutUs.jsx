import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Users, ShoppingBag, Shield, Globe } from 'lucide-react';




const AboutUs = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen max-pad-container">
      {/* Hero Section */}
      <div className="relative text-white bg-emerald-700">
        <div className="container px-4 py-16 mx-auto lg:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl">Your Global Marketplace Destination</h1>
            <p className="text-lg lg:text-xl opacity-90">Connecting buyers and sellers worldwide through a secure, efficient, and user-friendly platform.</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden lg:block">
          <div className="w-64 h-64 -mb-32 -mr-32 rounded-full opacity-50 bg-emerald-600"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-emerald-50 lg:py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            <div className="p-6">
              <p className="text-3xl font-bold lg:text-4xl text-emerald-700">10K+</p>
              <p className="mt-2 text-gray-600">Active Vendors</p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold lg:text-4xl text-emerald-700">100K+</p>
              <p className="mt-2 text-gray-600">Products</p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold lg:text-4xl text-emerald-700">50+</p>
              <p className="mt-2 text-gray-600">Countries</p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold lg:text-4xl text-emerald-700">1M+</p>
              <p className="mt-2 text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center lg:text-4xl">Why Choose Our Marketplace?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Diverse Community</h3>
              <p className="text-gray-600">Connect with sellers and buyers from around the world in our vibrant marketplace.</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100">
                <ShoppingBag className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Quality Products</h3>
              <p className="text-gray-600">Curated selection of high-quality products from verified vendors.</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Secure Platform</h3>
              <p className="text-gray-600">Advanced security measures to protect your transactions and data.</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Global Reach</h3>
              <p className="text-gray-600">Expand your business globally with our worldwide shipping network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-emerald-50 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold lg:text-4xl">Our Story</h2>
            <p className="mb-6 text-gray-600">
              Founded in 2020, our marketplace began with a simple vision: to create a platform where sellers from around the world could easily connect with buyers seeking quality products. Today, we've grown into a thriving community of entrepreneurs, artisans, and shoppers.
            </p>
            <p className="text-gray-600">
              Our commitment to innovation, security, and customer satisfaction has made us one of the fastest-growing marketplaces in the industry. We continue to evolve and improve our platform to better serve our global community.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold lg:text-4xl">Get In Touch</h2>
            <p className="mb-8 text-gray-600">Have questions about our marketplace? We're here to help!</p>
            <button className="px-8 py-3 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AboutUs