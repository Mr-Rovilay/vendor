import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpDown, Search, Activity, Package } from "lucide-react";
import { getAllOrdersOfUser } from "@/redux/actions/orderActions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

const TrackUserOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const sortData = (data, key, direction) => {
    if (!key) return data;
    return [...data].sort((a, b) => {
      if (key === 'total') {
        const aValue = parseFloat(a[key].replace('US$ ', ''));
        const bValue = parseFloat(b[key].replace('US$ ', ''));
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const formatOrders = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: `US$ ${item.totalPrice.toLocaleString()}`,
    status: item.status,
  })) || [];

  const filteredOrders = formatOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = sortConfig.key 
    ? sortData(filteredOrders, sortConfig.key, sortConfig.direction)
    : filteredOrders;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const getStatusVariant = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const requestSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Mobile order card component
  const OrderCard = ({ order }) => (
    <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm">
      <div className="items-center justify-between mb-2">
        <span className="text-sm font-medium text-emerald-700">ID: {order.id}</span>
        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div>
          <span className="text-gray-500">Items:</span>
          <span className="ml-2 font-medium">{order.itemsQty}</span>
        </div>
        <div className="text-right">
          <span className="text-gray-500">Total:</span>
          <span className="ml-2 font-medium text-emerald-600">{order.total}</span>
        </div>
      </div>
      <Link to={`/user/track/order/${order.id}`}>
        <Button variant="outline" size="sm" className="w-full hover:bg-emerald-50 border-emerald-200">
          <Package className="w-4 h-4 mr-2 text-emerald-600" />
          Track Order
        </Button>
      </Link>
    </div>
  );

  return (
    <Card className="w-full bg-gradient-to-b from-emerald-50/50">
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <CardTitle className="flex items-center text-emerald-800">
            <Activity className="w-6 h-6 mr-2 text-emerald-600" />
            Order Tracking
          </CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-emerald-500" />
              <Input
                placeholder="Search orders..."
                className="pl-8 text-sm border-emerald-200 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={ordersPerPage.toString()}
              onValueChange={(value) => setOrdersPerPage(Number(value))}
            >
              <SelectTrigger className="w-full sm:w-[180px] border-emerald-200">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 50].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden border rounded-md md:block border-emerald-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50/50">
                <TableHead className="w-[200px]">
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('id')}
                    className="text-emerald-700 hover:text-emerald-900"
                  >
                    Order ID
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost"
                    onClick={() => requestSort('status')}
                    className="text-emerald-700 hover:text-emerald-900"
                  >
                    Status
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost"
                    onClick={() => requestSort('itemsQty')}
                    className="text-emerald-700 hover:text-emerald-900"
                  >
                    Items
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost"
                    onClick={() => requestSort('total')}
                    className="text-emerald-700 hover:text-emerald-900"
                  >
                    Total
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-emerald-50/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{order.itemsQty}</TableCell>
                  <TableCell className="text-right text-emerald-600">{order.total}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/user/track/order/${order.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-emerald-50 border-emerald-200"
                      >
                        <Package className="w-4 h-4 mr-2 text-emerald-600" />
                        Track Order
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {currentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-between py-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-emerald-200"
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index} className="hidden sm:block">
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                      className={currentPage === index + 1 ? "bg-emerald-600" : "hover:bg-emerald-50"}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-emerald-200"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="text-sm text-emerald-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackUserOrder;