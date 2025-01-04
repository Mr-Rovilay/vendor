import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProductDetailsCard from "../Product-detailsCard/ProductDetailsCard";
import { Badge } from "../ui/badge";
import { addToWishlist, removeFromWishlist } from "@/redux/actions/wishlistActions";
import { addToCart } from "@/redux/actions/cartActions";
import { Card, CardContent } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
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

  const productPrice = data.originalPrice === 0 ? data.originalPrice : data.discountPrice;
  const displayName = data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        <div className="relative">
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <img
              src={data.images && data.images?.[0]?.url}
              className="object-cover w-full h-48 rounded-md"
            />
          </Link>
          <div className="absolute flex flex-col space-y-2 top-2 right-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
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
                  >
                    <Eye className="w-4 h-4" />
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
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to={`/shop/preview/${data?.shop._id}`}
            className="text-sm font-bold text-green-400 hover:underline"
          >
            {data.shop.name}
          </Link>
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`} className="block mt-1">
            <h3 className="text-lg font-semibold leading-tight lowercase">
              {displayName}
            </h3>
          </Link>
          <div className="flex items-center mt-2 text-xs">
            <Ratings rating={data?.ratings} />
          </div>
        </div>
      </CardContent>
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex gap-2">
          {data.originalPrice !== data.discountPrice && (
            <span className="text-sm text-red-500 line-through text-muted-foreground">
              ${data.originalPrice}
            </span>
          )}
          <span className="text-sm font-bold">${productPrice}</span>
        </div>
        <Badge variant="secondary">{data?.sold_out} sold</Badge>
      </div>
      {isDetailsOpen && (
        <ProductDetailsCard setOpen={setIsDetailsOpen} data={data} />
      )}
    </Card>
  );
};

export default ProductCard;