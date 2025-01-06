import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ProductCard from "@/components/product-card/ProductCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/redux/actions/productAction";
import { PackageX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!categoryData) {
      setData(allProducts);
    } else {
      const filteredData = allProducts?.filter((item) => item.category === categoryData);
      setData(filteredData);
    }
  }, [allProducts, categoryData]);

  const renderProductGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <PackageX className="w-16 h-16 mb-4 text-green-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            No Products Found
          </h3>
          <p className="max-w-md text-gray-500">
            {categoryData 
              ? `We couldn't find any products in the "${categoryData} category". Please try another category or check back later.`
              : "No products are available at the moment. Please check back later."}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item, index) => (
          <ProductCard 
            key={index} 
            data={item} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        <CardHeader className="max-pad-container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {categoryData ? `${categoryData} Products` : 'All Products'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CardTitle className="mt-4 text-2xl font-semibold">
            {categoryData ? `${categoryData} Products` : 'All Products'}
          </CardTitle>
        </CardHeader>
        <CardContent className="max-pad-container">
          {renderProductGrid()}
        </CardContent>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;