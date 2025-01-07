import { getAllProducts } from "@/redux/actions/productAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, CardTitle } from "../ui/card";
import ProductCard from "../product-card/ProductCard";

const BestDeals = () => {
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
      const firstFive = sortedData.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-pad-container">
        <CardHeader className="mb-8">
          <CardTitle className="text-3xl font-bold text-center">
            Best Deals
            <div className="w-20 h-1 mx-auto mt-2 rounded bg-emerald-500"></div>
          </CardTitle>
          <p className="mt-4 font-bold text-center">
            Discover our most popular and best-selling items
          </p>
        </CardHeader>

        {/* Horizontal Scrollable Container */}
        <div className="flex gap-6 overflow-x-scroll  snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-emerald-100">
          {data && data.map((item, index) => (
            <div
              key={index}
              className="min-w-[80%] sm:min-w-[50%] md:min-w-[33%] lg:min-w-[25%] xl:min-w-[20%] snap-center transition-transform duration-300 hover:-translate-y-1"
            >
              <ProductCard data={item} />
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
