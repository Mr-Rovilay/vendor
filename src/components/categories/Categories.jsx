import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { brandingData, categoriesData } from "@/static/data";
import { Card, CardContent } from "../ui/card";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category.title)}`);
  };

  return (
    <div className="px-4 py-8 mx-auto max-pad-container bg-gradient-to-br from-blue-50 to-white">
      {/* Branding Section */}
      <div className="mb-12">
        <ScrollArea className="w-full border rounded-md whitespace-nowrap">
          <div className="flex p-4 space-x-4 w-max">
            {brandingData.map((item, index) => (
              <Card key={index} className="w-[250px] flex-shrink-0">
                <CardContent className="flex items-center p-4">
                  <div className="mr-4 text-primary">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.Description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {categoriesData.map((category) => (
          <Card
            key={category.id}
            className="transition-all cursor-pointer hover:shadow-md"
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="flex flex-col items-center justify-between h-full p-4">
              <h5 className="mb-2 font-semibold text-center">{category.title}</h5>
              <div className="relative w-full h-24">
                <img
                  src={category.image_Url}
                  alt={category.title}
                  className="object-contain w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;

