import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { 
  ArrowRight, 
  Wallet, 
  Package, 
  ShoppingCart 
} from "lucide-react";
import { getAllOrdersOfShop } from "@/redux/actions/orderActions";
import { getAllProductsShop } from "@/redux/actions/productAction";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

const ShopDashboardHero = () => {
    const dispatch = useDispatch();
    const { orders = [] } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const { products = [] } = useSelector((state) => state.products);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
  
    useEffect(() => {
      if (seller?._id) {
        dispatch(getAllOrdersOfShop(seller._id));
        dispatch(getAllProductsShop(seller._id));
      }
    }, [dispatch, seller?._id]);

    useEffect(() => {
      // Update delivered orders whenever orders change
      const orderData = orders.filter((item) => item.status === "Delivered");
      setDeliveredOrders(orderData);
    }, [orders]);

    // Calculate totals
    const totalEarning = deliveredOrders.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    const serviceCharge = totalEarning * 0.1;
    const availableBalance = (totalEarning - serviceCharge).toFixed(2);
  
    const StatCard = ({ icon: Icon, title, value, link, linkText, color }) => (
      <Card className="w-full mb-4 800px:w-[30%]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-gray-600">
            {title}
          </CardTitle>
          <Icon className={`h-6 w-6 ${color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {link && (
            <Link to={link}>
              <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800">
                {linkText}
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  
    // If seller data isn't loaded yet, show loading state
    if (!seller) {
      return (
        <div className="w-full p-8 flex justify-center items-center min-h-[200px]">
          <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
        </div>
      );
    }
  
    return (
      <div className="w-full p-3 space-y-6">
        <h3 className="text-2xl font-semibold">Overview</h3>
        
        <div className="flex flex-col items-center justify-between w-full gap-4 800px:flex-row">
          <StatCard
            icon={Wallet}
            title="Account Balance"
            value={`$${availableBalance}`}
            link="/dashboard-withdraw-money"
            linkText="Withdraw Money"
            color="text-green-500"
          />
          
          <StatCard
            icon={Package}
            title="All Orders"
            value={orders.length}
            link="/dashboard-orders"
            linkText="View Orders"
            color="text-blue-500"
          />
          
          <StatCard
            icon={ShoppingCart}
            title="All Products"
            value={products.length}
            link="/dashboard-products"
            linkText="View Products"
            color="text-purple-500"
          />
        </div>
  
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Latest Orders</h3>
          <Card>
            <CardContent className="p-0">
              {orders.length > 0 ? (
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
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">{order._id}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={order.status === "Delivered" ? "success" : "secondary"}
                            className={
                              order.status === "Delivered" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {order.cart?.reduce((acc, item) => acc + (item.qty || 0), 0) || 0}
                        </TableCell>
                        <TableCell>US$ {order.totalPrice || 0}</TableCell>
                        <TableCell className="text-right">
                          <Link to={`/shop/order/${order._id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:text-blue-600"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center p-8 text-gray-500">
                  <p className="text-center">No new orders yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  export default ShopDashboardHero;