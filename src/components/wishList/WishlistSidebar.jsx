import { addToCart } from "@/redux/actions/cartActions";
import { removeFromWishlist } from "@/redux/actions/wishlistActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { AnimatePresence,motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


const WishlistSidebar = () => {
  const [openWishlist, setOpenWishlist] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const addToCartHandler = (item) => {
    const isItemExists = cart && cart.find((i) => i._id === item._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (item.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...item, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully!");
      setOpenWishlist(false);
    }
  };

  // Calculate total value of wishlist items
  const totalValue = wishlist.reduce(
    (acc, item) => acc + item.discountPrice,
    0
  );

  return (
    <>
      {/* Wishlist Icon Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="relative w-8 h-8 bg-gray-100 rounded-full"
        onClick={() => setOpenWishlist(true)}
      >
        <Heart className="w-5 h-5" />
        <Badge
          className="absolute text-white bg-green-500 -top-2 -right-2"
          // variant="secondary"
        >
          {wishlist.length}
        </Badge>
      </Button>

      {/* Animated Overlay and Sliding Wishlist Sidebar */}
      <AnimatePresence>
        {openWishlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenWishlist(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full bg-white shadow-xl w-96"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Wishlist Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Wishlist</h2>
                <span>{wishlist.length} items</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenWishlist(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Wishlist Items */}
              <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                {wishlist.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your wishlist is empty
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wishlist.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <img
                              src={item.images[0]?.url}
                              alt={item.name}
                              className="object-cover w-16 h-16 rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium line-clamp-1">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                ${item.discountPrice}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="space-x-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => addToCartHandler(item)}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeFromWishlistHandler(item)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Wishlist Summary */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total Value:</span>
                  <span className="font-bold">US${totalValue}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WishlistSidebar;