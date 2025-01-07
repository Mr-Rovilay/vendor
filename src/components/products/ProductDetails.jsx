import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Heart,
  ShoppingCart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Ratings from "./Ratings";
import { addToCart } from "@/redux/actions/cartActions";
import { getAllProductsShop } from "@/redux/actions/productAction";
import { addToWishlist, removeFromWishlist } from "@/redux/actions/wishlistActions";
import api from "@/utils/server";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    }
  }, [data, wishlist, dispatch]);

  const handleQuantityChange = (type) => {
    if (type === "dec" && count > 1) {
      setCount(count - 1);
    } else if (type === "inc" && count < data.stock) {
      setCount(count + 1);
    } else if (type === "inc") {
      toast.warning("Cannot exceed available stock!");
    }
  };

  const handleWishlist = () => {
    setClick(!click);
    if (!click) {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist");
    } else {
      dispatch(removeFromWishlist(data));
      toast.success("Removed from wishlist");
    }
  };

  const handleMessageSubmit = async () => {
    if (!isAuthenticated) {
      return toast.error("Please login to create a conversation");
    }

    try {
      const response = await api.post("/conversation/create-new-conversation", {
        groupTitle: data._id + user._id,
        userId: user._id,
        sellerId: data.shop._id,
      });
      navigate(`/inbox?${response.data.conversation._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating conversation");
    }
  };

  const handleAddToCart = () => {
    if (cart?.find((i) => i._id === data._id)) {
      return toast.error("Item already in cart!");
    }
    if (data.stock < 1) {
      return toast.error("Product stock limited!");
    }
    dispatch(addToCart({ ...data, qty: count }));
    toast.success("Item added to cart successfully!");
  };

  const totalReviewsLength = products?.reduce((acc, product) => acc + (product.reviews?.length || 0), 0) || 0;
  const totalRatings = products?.reduce((acc, product) => 
    acc + (product.reviews?.reduce((sum, review) => sum + (review.rating || 0), 0) || 0), 0) || 0;
  const averageRating = totalReviewsLength ? (totalRatings / totalReviewsLength).toFixed(2) : "0.00";

  if (!data) {
    return (
      <div className="w-full h-[450px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 rounded-full border-emerald-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 bg-white">
      <div className="mx-auto max-pad-container">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-emerald-100">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={data.images[selectedImage]?.url}
                    alt={data.name}
                    className="object-cover w-full h-full"
                  />
                  {data.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute transform -translate-y-1/2 left-4 top-1/2 bg-white/80 hover:bg-white"
                        onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : data.images.length - 1))}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute transform -translate-y-1/2 right-4 top-1/2 bg-white/80 hover:bg-white"
                        onClick={() => setSelectedImage((prev) => (prev < data.images.length - 1 ? prev + 1 : 0))}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 overflow-x-auto">
              {data.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === index 
                      ? "border-emerald-600 opacity-100" 
                      : "border-transparent opacity-50 hover:opacity-100"
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{data.name}</h1>
              <div className="flex items-center gap-4">
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <Badge variant="outline" className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100">
                    {data.shop.name}
                  </Badge>
                </Link>
                <div className="flex items-center">
                  <Ratings rating={data.ratings} />
                  <span className="ml-2 text-sm text-gray-500">({data.ratings} ratings)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600">{data.description}</p>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-emerald-600">${data.discountPrice}</span>
              {data.originalPrice > data.discountPrice && (
                <span className="text-lg text-gray-400 line-through">${data.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-emerald-600 hover:text-emerald-700"
                  onClick={() => handleQuantityChange("dec")}
                >
                  -
                </Button>
                <span className="w-12 text-center">{count}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-emerald-600 hover:text-emerald-700"
                  onClick={() => handleQuantityChange("inc")}
                >
                  +
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "border-emerald-200 hover:border-emerald-300",
                  click && "bg-red-50"
                )}
                onClick={handleWishlist}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    click ? "fill-red-500 text-red-500" : "text-emerald-600"
                  )}
                />
              </Button>
            </div>

            <div className="grid gap-4">
              <Button 
                size="lg" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Card className="border-emerald-100">
                <CardContent className="flex items-center gap-4 p-4">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <Avatar className="w-12 h-12 border-2 border-emerald-200">
                      <AvatarImage src={data.shop.avatar?.url} />
                      <AvatarFallback className="bg-emerald-50 text-emerald-700">
                        {data.shop.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <Link 
                      to={`/shop/preview/${data?.shop._id}`}
                      className="text-lg font-semibold hover:text-emerald-700"
                    >
                      {data.shop.name}
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={handleMessageSubmit}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-12">
          <TabsList className="grid w-full grid-cols-3 bg-emerald-50">
            <TabsTrigger 
              value="details"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="seller"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
            >
              Seller Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="border-emerald-100">
              <CardContent className="p-6">
                <p className="leading-relaxed text-gray-600">{data.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="border-emerald-100">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {data.reviews?.length > 0 ? (
                    data.reviews.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 pb-6 border-b border-emerald-100 last:border-0"
                      >
                        <Avatar className="border-2 border-emerald-100">
                          <AvatarImage src={user.avatar?.url} className="object-cover"/>
                          <AvatarFallback className="bg-emerald-50 text-emerald-700">
                            {user.name?.charAt(0) || "G"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {user.name || "Guest"}
                            </span>
                            <Ratings rating={item.rating} />
                          </div>
                          <p className="mt-2 text-gray-600">{item.comment}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No reviews yet for this product.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller">
            <Card className="border-emerald-100">
              <CardContent className="p-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Link to={`/shop/preview/${data.shop._id}`}>
                        <Avatar className="w-16 h-16 border-2 border-emerald-200">
                          <AvatarImage src={data.shop.avatar?.url} />
                          <AvatarFallback className="text-xl bg-emerald-50 text-emerald-700">
                            {data.shop.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <Link 
                          to={`/shop/preview/${data.shop._id}`}
                          className="text-xl font-semibold hover:text-emerald-700"
                        >
                          {data.shop.name}
                        </Link>
                        <div className="flex items-center mt-1">
                          <Ratings rating={averageRating} />
                          <span className="ml-2 text-sm text-gray-500">
                            ({totalReviewsLength} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-600">{data.shop.description}</p>
                      <p className="text-sm text-emerald-600">{data.shop.email}</p>
                      
                      <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-emerald-50">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="block font-medium text-gray-900">Joined</span>
                            {new Date(data.shop.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="block font-medium text-gray-900">Total Products</span>
                            {products?.length || 0}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="block font-medium text-gray-900">Total Reviews</span>
                            {totalReviewsLength}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="block font-medium text-gray-900">Average Rating</span>
                            {averageRating} / 5.0
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <Link to={`/shop/preview/${data.shop._id}`}>
                      <Button 
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Visit Shop
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;