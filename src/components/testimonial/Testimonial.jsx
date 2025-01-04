import { useState, useEffect } from 'react';
import { Star, Quote, Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonial = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const testimonials = [
    {
      id: 1,
      author: "Sarah Johnson",
      role: "Fashion Boutique Owner",
      content: "This marketplace transformed my small boutique into a thriving online business. The platform is intuitive, and the support team is exceptional.",
      rating: 5,
      store: "Chic & Unique",
      image: "https://www.kab.ac.ug/wp-content/uploads/2023/10/Sarah-Nakero.jpg"
    },
    {
      id: 2,
      author: "Michael Chen",
      role: "Electronics Vendor",
      content: "The best decision for my business was joining this platform. Sales have increased by 200% in just six months!",
      rating: 5,
      store: "TechHub Pro",
      image: "https://media.premiumtimesng.com/wp-content/files/2019/10/Mike-BBNaija.jpg"
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      role: "Artisan Crafts Seller",
      content: "The multivendor features are perfect for creative sellers. I love how easy it is to manage my inventory and connect with customers.",
      rating: 4,
      store: "Handmade Haven",
      image: "https://www.kab.ac.ug/wp-content/uploads/2023/10/Sarah-Nakero.jpg"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-green-50 to-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl px-4 py-14 mx-auto">
        {/* Header Section with fade-in and slide-down effect */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-4xl">
            What Our Vendors Say
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-gray-600">
            Join thousands of successful vendors who have grown their business with our marketplace platform
          </p>
        </div>

        {/* Testimonials Grid with staggered fade-in */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-1000 delay-${index * 200} transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  {/* Quote Icon with rotate animation on hover */}
                  <div className="mb-4 transition-transform duration-300 transform hover:rotate-12">
                    <Quote className="w-8 h-8 text-green-500 opacity-50" />
                  </div>

                  {/* Store Info with slide-in effect */}
                  <div className="flex items-center mb-4">
                    <Store className="w-4 h-4 mr-2 text-green-600 transition-transform duration-300 hover:scale-110" />
                    <span className="font-medium text-green-600">{testimonial.store}</span>
                  </div>

                  {/* Rating with pop-in effect */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 text-yellow-400 fill-current transition-all duration-300 delay-${i * 100} hover:scale-125`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="mb-6 text-gray-600">"{testimonial.content}"</p>

                  {/* Author Info with hover effect */}
                  <div className="flex items-center group">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="object-cover w-12 h-12 mr-4 transition-transform duration-300 rounded-full group-hover:scale-110"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{testimonial.author}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action with pulse animation */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button  className="px-4 py-3 font-medium text-white transition-all duration-500 bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-pulse hover:animate-none">
            Join Our Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;