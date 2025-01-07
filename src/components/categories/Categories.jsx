import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { brandingData, categoriesData } from "@/static/data";
import { Card, CardContent } from "../ui/card";
import { ChevronRight } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category.title)}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="px-4 py-12 mx-auto max-pad-container">
        {/* Branding Section with enhanced styling */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
            Why Shop With Us
            <div className="w-24 h-1 mx-auto mt-2 bg-emerald-500 rounded"></div>
          </h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max gap-6 p-4">
              {brandingData.map((item, index) => (
                <Card 
                  key={index} 
                  className="w-[280px] flex-shrink-0 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="flex items-center p-6">
                    <div className="p-3 mr-4 text-emerald-600 bg-emerald-100 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.Description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Categories Section with enhanced styling */}
        <div className="mb-8">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
            Shop by Category
            <div className="w-24 h-1 mx-auto mt-2 bg-green-500 rounded"></div>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categoriesData.map((category, index) => (
            <Card
              key={category.id}
              className="overflow-hidden transition-all bg-white/80 backdrop-blur-sm hover:shadow-xl group cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="p-4">
                <div className="relative mb-4 overflow-hidden aspect-square rounded-xl">
                  <img
                    src={category.image_Url}
                    alt={category.title}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-800">{category.title}</h5>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 text-blue-500 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;