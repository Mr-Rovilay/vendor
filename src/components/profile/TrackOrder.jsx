import { getAllOrdersOfUser } from "@/redux/actions/orderActions";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  CircleDollarSign,
  AlertCircle,
  PackageX
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const getStatusConfig = (status) => {
    const configs = {
      "Processing": {
        icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-500",
        message: "Your order is being processed in the shop"
      },
      "Transferred to delivery partner": {
        icon: <Package className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-500",
        message: "Order has been transferred to delivery partner"
      },
      "Shipping": {
        icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-500",
        message: "Your order is on the way with our delivery partner"
      },
      "Received": {
        icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100",
        borderColor: "border-indigo-500",
        message: "Your order has reached your city"
      },
      "On the way": {
        icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-orange-500",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-500",
        message: "Delivery person is on the way to deliver your order"
      },
      "Delivered": {
        icon: <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
        borderColor: "border-green-500",
        message: "Your order has been delivered successfully!"
      },
      "Processing refund": {
        icon: <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-500",
        message: "Your refund is being processed"
      },
      "Refund Success": {
        icon: <CircleDollarSign className="w-5 h-5 md:w-6 md:h-6" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
        borderColor: "border-green-500",
        message: "Refund has been processed successfully!"
      }
    };

    return configs[status] || {
      icon: <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-500",
      message: "Status unknown"
    };
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <PackageX className="w-16 h-16 mb-4 text-gray-400" />
            <CardTitle className="mb-2 text-xl">No Orders Found</CardTitle>
            <p className="text-gray-500">You haven't placed any orders yet. Start shopping to see your orders here!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />
            <CardTitle className="mb-2 text-xl">Order Not Found</CardTitle>
            <p className="text-gray-500">We couldn't find the order you're looking for. Please check the order ID and try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(data.status);

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg text-center md:text-xl">
            Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Status Icon */}
            <div className={`p-3 md:p-4 rounded-full ${statusConfig.bgColor}`}>
              <div className={`${statusConfig.color}`}>
                {statusConfig.icon}
              </div>
            </div>

            {/* Status Message */}
            <div className="px-2 space-y-2 text-center">
              <h2 className={`text-lg md:text-xl font-semibold ${statusConfig.color}`}>
                {data.status}
              </h2>
              <p className="text-sm text-gray-600 md:text-base">
                {statusConfig.message}
              </p>
            </div>

            {/* Timeline */}
            <div className="w-full max-w-md mt-8">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                  "Processing refund",
                  "Refund Success"
                ].map((step, index) => {
                  const isCompleted = getStatusConfig(data.status).message.includes(getStatusConfig(step).message);
                  const isCurrent = data.status === step;
                  
                  return (
                    <div key={index} className="relative mb-6 md:mb-8">
                      <div className="flex items-center">
                        <div className="flex-1 pr-2 text-right md:pr-4">
                          <div className={`text-xs md:text-sm ${isCompleted || isCurrent ? statusConfig.color : 'text-gray-400'}`}>
                            {step}
                          </div>
                        </div>
                        <div 
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 flex items-center justify-center
                            ${isCompleted ? 'bg-green-500 border-green-500' : 
                              isCurrent ? statusConfig.bgColor + ' ' + statusConfig.borderColor : 
                              'bg-gray-200 border-gray-300'}`}
                        >
                        </div>
                        <div className="flex-1 pl-2 md:pl-4">
                          <div className={`text-xs md:text-sm ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                            {getStatusConfig(step).message}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrder;