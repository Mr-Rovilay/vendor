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
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-pad-container">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Best Deals
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            <>
              {data &&
                data.map((i, index) => {
                  return <ProductCard data={i} key={index} />;
                })}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
