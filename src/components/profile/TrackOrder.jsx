import { getAllOrdersOfUser } from "@/redux/actions/orderActions";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  CircleDollarSign,
  AlertCircle
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
        icon: <Clock className="w-6 h-6" />,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-500",
        message: "Your order is being processed in the shop"
      },
      "Transferred to delivery partner": {
        icon: <Package className="w-6 h-6" />,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-500",
        message: "Order has been transferred to delivery partner"
      },
      "Shipping": {
        icon: <Truck className="w-6 h-6" />,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-500",
        message: "Your order is on the way with our delivery partner"
      },
      "Received": {
        icon: <MapPin className="w-6 h-6" />,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100",
        borderColor: "border-indigo-500",
        message: "Your order has reached your city"
      },
      "On the way": {
        icon: <Truck className="w-6 h-6" />,
        color: "text-orange-500",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-500",
        message: "Delivery person is on the way to deliver your order"
      },
      "Delivered": {
        icon: <CheckCircle2 className="w-6 h-6" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
        borderColor: "border-green-500",
        message: "Your order has been delivered successfully!"
      },
      "Processing refund": {
        icon: <RotateCcw className="w-6 h-6" />,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-500",
        message: "Your refund is being processed"
      },
      "Refund Success": {
        icon: <CircleDollarSign className="w-6 h-6" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
        borderColor: "border-green-500",
        message: "Refund has been processed successfully!"
      }
    };

    return configs[status] || {
      icon: <AlertCircle className="w-6 h-6" />,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-500",
      message: "Status unknown"
    };
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-gray-500">
              Order not found
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(data.status);

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <span>Order Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Status Icon */}
            <div className={`p-4 rounded-full ${statusConfig.bgColor}`}>
              <div className={`${statusConfig.color}`}>
                {statusConfig.icon}
              </div>
            </div>

            {/* Status Message */}
            <div className="space-y-2 text-center">
              <h2 className={`text-xl font-semibold ${statusConfig.color}`}>
                {data.status}
              </h2>
              <p className="text-gray-600">
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
                    <div key={index} className="relative mb-8">
                      <div className="flex items-center">
                        <div className="flex-1 pr-4 text-right">
                          <div className={`text-sm ${isCompleted || isCurrent ? statusConfig.color : 'text-gray-400'}`}>
                            {step}
                          </div>
                        </div>
                        <div 
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                            ${isCompleted ? 'bg-green-500 border-green-500' : 
                              isCurrent ? statusConfig.bgColor + ' ' + statusConfig.borderColor : 
                              'bg-gray-200 border-gray-300'}`}
                        >
                        </div>
                        <div className="flex-1 pl-4">
                          <div className={`text-sm ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
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