import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ProductDetails from "@/components/products/ProductDetails";
import SuggestedProduct from "@/components/products/SuggestedProduct";
import { getAllProducts } from "@/redux/actions/productAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const ProductDetailsPage = () => {
  // Add more detailed logging
  const productState = useSelector((state) => state.products);
  const eventState = useSelector((state) => state.events);

  const { allProducts } = productState;
  const { allEvents } = eventState;
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents, id, eventData]);

  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
