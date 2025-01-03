import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getAllOrdersOfShop } from "@/redux/actions/orderActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const AllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const refundOrders = orders?.filter(
    (item) => 
      item.status === "Processing refund" || 
      item.status === "Refund Success"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-8 max-w-7xl">
      <CardHeader>
        <CardTitle>Refund Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundOrders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={order.status === "Refund Success" ? "success" : "secondary"}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.cart.length}</TableCell>
                  <TableCell>US$ {order.totalPrice}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/order/${order._id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </div>
  );
};

export default AllRefundOrders;