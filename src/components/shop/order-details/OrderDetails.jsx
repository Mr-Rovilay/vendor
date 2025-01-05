import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
import { ShippingInfo } from "./ShippingInfo";
import { PaymentInfo } from "./PaymentInfo";
import { OrderItem } from "./OrderItem";
import { getAllOrdersOfShop } from "@/redux/actions/orderActions";
import api from "@/utils/server";
import { Button } from "@/components/ui/button";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    try {
      await api.put(
        `/order/update-order-status/${id}`,
        { status }
      );
      toast.success("Order updated!");
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const refundOrderUpdateHandler = async () => {
    try {
      await api.put(
        `/order/order-refund-success/${id}`,
        { status }
      );
      toast.success("Order updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const isRefundStatus = data?.status === "Processing refund" || data?.status === "Refund Success";

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-xl font-bold md:text-2xl">
          <Package className="mr-2" />
          Order Details
        </CardTitle>
        <Link to="/dashboard-orders">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Order List
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4 text-sm">
          <p className="text-muted-foreground">
            Order ID: <span className="font-medium">#{data?._id?.slice(0, 8)}</span>
          </p>
          <p className="text-muted-foreground">
            Placed on: <span className="font-medium">{data?.createdAt?.slice(0, 10)}</span>
          </p>
        </div>

        <div className="mb-6 space-y-4">
          {data?.cart.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>

        <div className="pt-4 mb-6 text-right border-t">
          <p className="text-lg">
            Total Price: <strong>US${data?.totalPrice}</strong>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ShippingInfo data={data} />
          <PaymentInfo data={data} />
        </div>

        <div className="mt-6">
          <h4 className="mb-2 text-lg font-semibold">Order Status:</h4>
          <div className="flex items-center space-x-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {(isRefundStatus
                  ? ["Processing refund", "Refund Success"]
                  : ["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"]
                )
                  .slice((isRefundStatus
                    ? ["Processing refund", "Refund Success"]
                    : ["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"]
                  ).indexOf(data?.status))
                  .map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={isRefundStatus ? refundOrderUpdateHandler : orderUpdateHandler}>
              Update Status
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;

