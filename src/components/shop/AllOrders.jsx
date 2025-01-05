import { getAllOrdersOfShop } from "@/redux/actions/orderActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "Transferred to delivery partner":
        return "bg-indigo-100 text-indigo-700 hover:bg-indigo-200";
      case "Shipping":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200";
      case "On the way":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const rows = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: `US$ ${item.totalPrice}`,
    status: item.status,
  })) || [];

  return (
    <div className="w-full mx-auto mt-3">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <div className="px-1">
        {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Items Qty</TableHead>
                <TableHead className="font-semibold">Total</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>
                      <Badge className={getStatusStyle(row.status)}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.itemsQty}</TableCell>
                    <TableCell className="font-semibold">{row.total}</TableCell>
                    <TableCell>
                      <Link to={`/shop/order/${row.id}`}>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={5} 
                    className="py-8 text-center text-gray-500"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AllOrders;