import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  ClipboardList, 
  CheckCircle2, 
  XCircle,
  Truck,
  Clock
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '@/redux/actions/orderActions';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';


const getStatusVariant = (status) => {
  switch(status?.toLowerCase()) {
    case 'processing':
      return 'secondary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'destructive';
    case 'on delivery':
      return 'warning';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status) => {
  switch(status?.toLowerCase()) {
    case 'processing':
      return <Clock className="w-4 h-4 mr-2" />;
    case 'delivered':
      return <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 mr-2 text-red-500" />;
    case 'on delivery':
      return <Truck className="w-4 h-4 mr-2" />;
    default:
      return <Package className="w-4 h-4 mr-2" />;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading orders...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error loading orders</CardTitle>
        </CardHeader>
        <div className="p-6">
          <p className="text-red-500">{error}</p>
        </div>
      </Card>
    );
  }

  const safeOrders = Array.isArray(orders) ? orders : [];
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = safeOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(safeOrders.length / ordersPerPage);

  const MobileOrderView = () => (
    <Accordion type="single" collapsible className="w-full md:hidden">
      {currentOrders.map((order) => (
        <AccordionItem key={order._id} value={`item-${order._id}`}>
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span>Order #{order._id.slice(-8)}</span>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-2">
              <div>
                <span className="font-medium">Items:</span>
                {order.cart?.map((item, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {item.name} x {item.qty}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="font-medium">Total:</span>
                  <p className="text-sm">${order.totalPrice?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p className="text-sm">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div>
                <span className="font-medium">Payment:</span>
                <p className="text-sm">{order.paymentInfo?.type}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Link to={`/order/${order._id}`}>
                  <Button variant="outline" size="sm">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  if (safeOrders.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <ClipboardList className="w-6 h-6 mr-2" />
              My Orders
            </div>
          </CardTitle>
        </CardHeader>
        <div className="p-6 text-center">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle>
            <div className="flex items-center">
              <ClipboardList className="w-6 h-6 mr-2" />
              My Orders
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Orders per page:</span>
            <Select 
              value={ordersPerPage.toString()} 
              onValueChange={(value) => setOrdersPerPage(Number(value))}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
     
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  #{order._id.slice(-8)}
                </TableCell>
                <TableCell>
                  {order.cart?.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item.name} x {item.qty}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  ${order.totalPrice?.toLocaleString()}
                </TableCell>
                <TableCell>
                  {order.paymentInfo?.type}
                </TableCell>
                <TableCell>
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link to={`/user/order/${order._id}`}>
                    <Button variant="outline" size="icon">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MobileOrderView />

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between mt-4 space-y-2 md:flex-row md:space-y-0">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AllOrders;