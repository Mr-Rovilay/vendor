import { getAllOrdersOfShop } from "@/redux/actions/orderActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
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
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={row.status === "Delivered" ? "success" : "default"}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.itemsQty}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>
                      <Link to={`/shop/order/${row.id}`}>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
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

