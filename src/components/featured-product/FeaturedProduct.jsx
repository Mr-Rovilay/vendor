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
      const firstTen = sortedData.slice(0, 10); // Adjust number of items to display here
      setData(firstTen);
    }
  }, [allProducts]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-pad-container">
        {/* Header Section */}
        <CardHeader className="mb-8">
          <CardTitle className="text-2xl font-bold text-center md:text-3xl">
            Featured Products
            <div className="w-20 h-1 mx-auto mt-2 rounded bg-emerald-500"></div>
          </CardTitle>
          <p className="mt-4 font-bold text-center">
            Discover our most featured items
          </p>
        </CardHeader>

        {/* Horizontal Scrollable Products Section */}
        <div className="flex gap-6 overflow-x-scroll lg:overflow-hidden snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-emerald-100">
          {data.length > 0 ? (
            data.map((product, index) => (
              <div
                key={product._id || index}
                className="min-w-[80%] sm:min-w-[50%] md:min-w-[33%] lg:min-w-[25%] xl:min-w-[20%] snap-center transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductCard data={product} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
