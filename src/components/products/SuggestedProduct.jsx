import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardTitle } from "../ui/card";
import ProductCard from "../product-card/ProductCard";
const SuggestedProduct = ({ data }) => {
  const {allProducts} = useSelector((state) => state.products);
  const [productData,setProductData] = useState();

  useEffect(() => {
    const d =
    allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className="max-pad-container">
           <CardTitle className="mb-5 text-3xl font-bold text-center">Related Product</CardTitle>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
               productData && productData.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;