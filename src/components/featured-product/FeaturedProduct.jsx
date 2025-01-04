import { useSelector } from "react-redux";
import { CardHeader, CardTitle } from "../ui/card";
import ProductCard from "../product-card/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-pad-container">
        {/* Header Section */}
        <CardHeader className="mb-8">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
           Featured Products
            <div className="w-20 h-1 mx-auto mt-2 rounded bg-emerald-500"></div>
          </CardTitle>
        <p className="mt-4 text-center text-gray-600">
          Discover our most featured items
        </p>
        </CardHeader>

        {/* Products Section */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product, index) => (
              <div
                key={index}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductCard data={product} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-40">
              <p className="text-lg text-gray-500">Loading featured deals...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
