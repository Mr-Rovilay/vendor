
import { addToCart } from "@/redux/actions/cartActions";
import { getAllProductsShop } from "@/redux/actions/productAction";
import { addToWishlist, removeFromWishlist } from "@/redux/actions/wishlistActions";
import {
  Heart,
  ShoppingCart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Ratings from "./Ratings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
  }, []);

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

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

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Added to wishlist");
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
    toast.success("Removed from wishlist");
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      try {
        const groupTitle = data._id + user._id;
        const userId = user._id;
        const sellerId = data.shop._id;

        const response = await api.post(
          `/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        );

        navigate(`/inbox?${response.data.conversation._id}`);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error creating conversation"
        );
      }
    } else {
      toast.error("Please login to create a conversation");
    }
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

  const totalReviewsLength =
    products?.reduce(
      (acc, product) => acc + (product.reviews?.length || 0),
      0
    ) || 0;
  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc +
        (product.reviews?.reduce(
          (sum, review) => sum + (review.rating || 0),
          0
        ) || 0),
      0
    ) || 0;
  const averageRating = totalReviewsLength
    ? (totalRatings / totalReviewsLength).toFixed(2)
    : "0.00";

  if (!data)
    return <div className="py-10 text-center">
    <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
    </div>;

  return (
    <div className="px-4 py-8 max-pad-container md:max-w-6xl md:mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="relative">
                <img
                  src={data.images && data.images?.[selectedImage]?.url}
                  alt={data.name}
                  className="object-cover w-full rounded-lg h-96"
                />

                {data.images.length > 1 && (
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev > 0 ? prev - 1 : data.images.length - 1
                        )
                      }
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {data.images.length > 1 && (
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev < data.images.length - 1 ? prev + 1 : 0
                        )
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Gallery */}
          <div className="flex justify-center space-x-2">
            {data.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className={cn(
                  "w-16 h-16 object-cover rounded-md cursor-pointer border-2",
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent opacity-50 hover:opacity-100"
                )}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="mb-4 text-3xl font-bold capitalize">{data.name}</h1>

          <div className="flex items-center mb-4">
            <Badge variant="outline" className="mr-2 capitalize">
              {data.shop.name}
            </Badge>
            <div className="flex items-center">
              <Ratings rating={data.shop.ratings} />
              <span className="hidden ml-2 text-sm text-gray-600 md:flex">
                ({data.shop.ratings} ratings)
              </span>
            </div>
          </div>

          <p className="mb-4 text-gray-600">{data.description}</p>

          <div className="flex items-center mb-4 space-x-2">
            <span className="font-bold text-xm text-primary">
              ${data.discountPrice}
            </span>
            {data.originalPrice > data.discountPrice && (
              <span className="text-red-400 line-through text-xm">
                ${data.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={decrementCount}>
                -
              </Button>
              <span className="px-4 py-2 border rounded">{count}</span>
              <Button variant="outline" size="icon" onClick={incrementCount}>
                +
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                click
                  ? removeFromWishlistHandler(data)
                  : addToWishlistHandler(data)
              }
            >
              <Heart
                className={cn(
                  "h-6 w-6",
                  click
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500 hover:text-red-500"
                )}
              />
            </Button>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={data.shop.avatar.url}
                      className="object-cover rounded-full"
                    />
                    <AvatarFallback>{data.shop.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold capitalize">{data.shop.name}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleMessageSubmit}
                      className="mt-2"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="seller">Seller Information</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <p className="leading-relaxed text-gray-600">
                {data.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              {data && data.reviews > 0 ? (
                <div className="space-y-4">
                  {data.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex items-start pb-4 space-x-4 border-b"
                    >
                      <Avatar>
                        <AvatarImage
                          src={
                            data?.shop?.avatar?.url ||
                            "/path-to-default-avatar.png"
                          }
                          className="object-cover rounded-full"
                        />

                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">
                            {user?.name || "Guest"}
                          </span>
                          <Ratings rating={review.rating} />
                        </div>
                        <p className="mt-1 text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No reviews yet for this product.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seller">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4 space-x-4">
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={data.shop.avatar.url}
                      className="object-cover rounded-full"
                    />
                    <AvatarFallback>{data.shop.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>

                <div>
                  <h3 className="text-xl font-semibold">{data.shop.name}</h3>
                  <div className="flex items-center">
                    <Ratings rating={data.shop.ratings} />
                    <span className="ml-2 text-sm text-gray-600">
                      ({data.shop.ratings} ratings)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-4 text-gray-600">{data.shop.description}</p>
                  <p className="text-sm text-gray-600">{data.shop.email}</p>
                  <div className="space-y-2">
                    <p>
                      <strong>Joined:</strong>{" "}
                      <span className="font-medium">
                        {new Date(data.shop.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                    <p>
                      <strong>Total Products:</strong>{" "}
                      <span className="font-medium">
                        {products?.length || 0}
                      </span>
                    </p>
                    <p>
                      <strong>Total Reviews:</strong>{" "}
                      <span className="font-medium">{totalReviewsLength}</span>
                    </p>
                    <p>
                      <strong>Average Rating:</strong>{" "}
                      <span className="font-medium">{averageRating}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <Button>Visit Shop</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetails;
