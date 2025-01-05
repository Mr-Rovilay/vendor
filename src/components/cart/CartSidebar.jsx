import { addToCart, removeFromCart } from "@/redux/actions/cartActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const increment = (item) => {
    if (item.stock <= item.qty) {
      toast.error("Product stock limited!");
    } else {
      const updateCartData = { ...item, qty: item.qty + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (item) => {
    if (item.qty > 1) {
      const updateCartData = { ...item, qty: item.qty - 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative w-8 h-8 bg-gray-100 rounded-full"
        onClick={() => setOpenCart(true)}
      >
        <ShoppingCart className="w-5 h-5" />
        <Badge
          className="absolute text-white bg-green-500 -top-2 -right-2"
          variant="secondary"
        >
          {cart && cart.length}
        </Badge>
      </Button>

      <AnimatePresence>
        {openCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenCart(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full bg-white shadow-xl w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <span>{cart && cart.length} items</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenCart(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty</p>
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
                      {cart.map((item) => (
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
                                ${item.discountPrice} x {item.qty}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="space-x-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decrement(item)}
                                disabled={item.qty <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span>{item.qty}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => increment(item)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeFromCartHandler(item)}
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

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">US${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full" disabled={cart.length === 0}>
                  <Link to="/checkout" className="w-full">
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
