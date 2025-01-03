/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const SellerProtectedRoute = ({ children }) => {
  const {  authenticateShop } = useSelector((state) => state.seller);
    if (!authenticateShop) {
      return <Navigate to={`/shop-login`} />;
    }
    return children;
  
};

export default SellerProtectedRoute;