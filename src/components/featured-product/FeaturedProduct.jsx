import { useSelector } from "react-redux";
import { CardHeader, CardTitle } from "../ui/card";
import ProductCard from "../product-card/ProductCard";


const FeaturedProduct = () => {
  const {allProducts} = useSelector((state) => state.products);
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-pad-container">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Featured Products
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {
            allProducts && allProducts.length !== 0 &&(
              <>
               {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
