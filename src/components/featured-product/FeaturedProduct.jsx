import { useDispatch, useSelector } from "react-redux";
import { CardHeader, CardTitle } from "../ui/card";
import ProductCard from "../product-card/ProductCard";
import { getAllProducts } from "@/redux/actions/productAction";
import { useEffect, useState } from "react";

const FeaturedProduct = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const sortedData = [...allProducts].sort(
        (a, b) => b.sold_out - a.sold_out
      );
      const firstFive = sortedData.slice(0, 5); // Changed to 5 from 10
      setData(firstFive);
    }
  }, [allProducts]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-pad-container">
        {/* Header Section */}
        <CardHeader className="mb-8">
          <CardTitle className="text-3xl font-bold text-center">
            Featured Products
            <div className="w-20 h-1 mx-auto mt-2 rounded bg-emerald-500"></div>
          </CardTitle>
          <p className="mt-4 font-bold text-center">
            Discover our most featured items
          </p>
        </CardHeader>

        {/* Products Section */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data.length > 0 ? (
            data.map((product, index) => (
              <div
                key={product._id || index}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductCard data={product} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8 col-span-full">
              <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;