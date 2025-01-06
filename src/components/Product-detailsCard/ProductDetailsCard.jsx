import { addToCart } from "@/redux/actions/cartActions";
import { addToWishlist, removeFromWishlist } from "@/redux/actions/wishlistActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Dialog, DialogContent } from "../ui/dialog";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Heart, MessageSquare, ShoppingCart } from "lucide-react";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [wishlist, data._id]);

  const handleMessageSubmit = () => {
    // Implement message submission logic
    toast.info("Message feature coming soon!");
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (count < data.stock) {
      setCount(count + 1);
    } else {
      toast.warning("Cannot exceed available stock!");
    }
  };

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
      return;
    }
    
    if (data.stock < count) {
      toast.error("Product stock limited!");
      return;
    }
    
    const cartData = { ...data, qty: count };
    dispatch(addToCart(cartData));
    toast.success("Item added to cart successfully!");
  };

  return (
    <Dialog open={true} onOpenChange={() => setOpen(false)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid gap-6 p-4 md:grid-cols-2">
          {/* Left Column - Product Image and Shop Info */}
          <div className="space-y-4">
            <img 
              src={data.images?.[0]?.url}
              alt={data.name} 
              className="object-cover w-full rounded-lg h-96"
            />
             <Link to={`/shop/preview/${data.shop._id}`}>
            <div className="flex items-center mt-4 space-x-4">
              <Avatar>
                <AvatarImage src={data.shop?.avatar?.url} alt={data.shop?.name} />
                <AvatarFallback>{data.shop?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{data.shop?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {data?.ratings || 0} Ratings
                </p>
              </div>
            </div>
             
             </Link>

            <Button 
              variant="default" 
              className="w-full"
              onClick={handleMessageSubmit}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Send Message
            </Button>

            <p className="text-destructive">
              {data?.sold_out || 0} Sold out
            </p>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            <h1 className="text-xl font-bold capitalize">{data.name}</h1>
            <p className="text-muted-foreground">{data.description}</p>

            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-primary">
                ${data.discountPrice}
              </span>
              {data.originalPrice > data.discountPrice && (
                <span className="text-lg text-red-500 line-through">
                  ${data.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementCount}
                  disabled={count <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 border rounded">{count}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={incrementCount}
                  // disabled={count >= data.stock}
                >
                  +
                </Button>
              </div>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleWishlistToggle}
              >
                 <Heart
                      className={`w-4 h-4 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
              </Button>
            </div>

            <Button 
              className="w-full" 
              onClick={handleAddToCart}
              disabled={data.stock < 1}
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> 
              {data.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsCard