import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, MapPin, Phone, Package, Star } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { getAllProductsShop } from "@/redux/actions/productAction";
import api from "@/utils/server";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start p-3 space-x-3">
    <Icon className="w-4 h-4 mt-1 text-muted-foreground" />
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="p-4 space-y-4">
    <div className="flex flex-col items-center space-y-3">
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-full h-16" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-3">
        <Skeleton className="w-4 h-4" />
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
    ))}
  </div>
);

export default function ShopInfo({ isOwner }) {
  const [data,setData] = useState({});
  const {products} = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        setIsLoading(true);
        // Dispatching the action to get all products
        dispatch(getAllProductsShop(id));
  
        // Fetching shop info
        const response = await api.get(`/shop/get-shop-info/${id}`);
        setData(response.data.shop);
  
      } catch (error) {
        console.error("Error fetching shop info:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchShopInfo();
  }, [dispatch, id]);
   

  const totalReviewsLength =
  products &&
  products.reduce((acc, product) => acc + product.reviews.length, 0);

const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

const averageRating = totalRatings / totalReviewsLength || 0;


  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={data.avatar?.url} alt={data.name} className="object-cover" />
                  <AvatarFallback>{data.name?.[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Shop Avatar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardTitle className="mt-4">{data.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {data.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <InfoItem
          icon={MapPin}
          label="Address"
          value={data.address}
        />
        <InfoItem
          icon={Phone}
          label="Phone Number"
          value={data.phoneNumber}
        />
        <InfoItem
          icon={Package}
          label="Total Products"
          value={products?.length || 0}
        />
        <InfoItem
          icon={Star}
          label="Shop Ratings"
          value={`${averageRating}/5`}
        />
        <InfoItem
          icon={Calendar}
          label="Joined On"
          value={data?.createdAt?.slice(0, 10)}
        />

        {isOwner && (
          <div className="pt-4">
            <Link to="/settings">
              <Button className="w-full">
                Edit Shop
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </>
  );
}