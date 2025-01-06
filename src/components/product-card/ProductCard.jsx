import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProductDetailsCard from "../Product-detailsCard/ProductDetailsCard";
import { Badge } from "../ui/badge";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/actions/wishlistActions";
import { addToCart } from "@/redux/actions/cartActions";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import Ratings from "../products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [wishlist, data._id]);

  const handleWishlistToggle = () => {
    if (isFavorite) {
      dispatch(removeFromWishlist(data));
    } else {
      dispatch(addToWishlist(data));
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const productPrice =
    data.originalPrice === 0 ? data.originalPrice : data.discountPrice;
  const displayName =
    data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 group hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                src={data.images && data.images[0]?.url}
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                alt={data.name}
              />
              <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-10" />
            </div>
          </Link>

          <div className="absolute flex flex-col space-y-2 transition-opacity duration-300 opacity-0 top-3 right-3 group-hover:opacity-100">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className="shadow-md bg-white/90 hover:bg-white"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-emerald-600"
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsDetailsOpen(true)}
                    className="shadow-md bg-white/90 hover:bg-white"
                  >
                    <Eye className="w-4 h-4 text-emerald-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleAddToCart}
                    className="shadow-md bg-white/90 hover:bg-white"
                  >
                    <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="p-4">
          <Link
            to={`/shop/preview/${data?.shop._id}`}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {data.shop.name}
          </Link>

          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
            className="block mt-2 group-hover:text-emerald-700"
          >
            <h3 className="text-lg font-semibold leading-tight capitalize">
              {displayName}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-1 text-sm">
              <Ratings rating={data?.ratings} />
            </div>
            {data.stock <= 0 ? (
              <Badge className="text-red-600 border-red-200 bg-red-50">
                Out of Stock
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className={`text-emerald-600 border-emerald-200 bg-emerald-50 ${
                  data.stock <= 3 ? "flash" : ""
                }`}
              >
                 {data.stock} {data.stock === 1 ? "stock" : "stocks"} left
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
  <div className="flex items-center gap-2">
    {data.originalPrice && data.originalPrice !== data.discountPrice && (
      <span className="text-sm text-red-400 line-through">
        ${data.originalPrice}
      </span>
    )}
    <span className="text-sm font-bold text-emerald-600">
      ${productPrice}
    </span>
  </div>
  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
    {data?.sold_out} sold
  </Badge>
</div>

        </div>
      </CardContent>

      {isDetailsOpen && (
        <ProductDetailsCard setOpen={setIsDetailsOpen} data={data} />
      )}
    </Card>
  );
};

export default ProductCard;
