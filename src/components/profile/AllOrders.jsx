import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  ClipboardList, 
  CheckCircle2, 
  XCircle,
  Truck,
  Clock,
  PackageX
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

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <PackageX className="w-16 h-16 mb-4 text-gray-300" />
    <h3 className="mb-2 text-lg font-semibold text-gray-600">No Orders Found</h3>
    <p className="max-w-sm text-gray-500">
      You haven't placed any orders yet. Start shopping to see your orders here.
    </p>
  </div>
);

// Loading state component
const LoadingState = () => (
  <Card className="w-full bg-gradient-to-b from-emerald-50/50">
    <CardHeader>
      <CardTitle className="flex items-center text-emerald-800">
        <ClipboardList className="w-6 h-6 mr-2 text-emerald-600 animate-pulse" />
        Loading Orders...
      </CardTitle>
    </CardHeader>
    <div className="p-6">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </Card>
);

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

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <Card className="w-full bg-gradient-to-b from-emerald-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-800">
            <XCircle className="w-6 h-6 mr-2 text-red-500" />
            Error Loading Orders
          </CardTitle>
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
    <Accordion type="single" collapsible className="w-full space-y-2 md:hidden">
      {currentOrders.map((order) => (
        <AccordionItem 
          key={order._id} 
          value={`item-${order._id}`}
          className="bg-white border rounded-lg border-emerald-200"
        >
          <AccordionTrigger className="px-4 hover:bg-emerald-50/50">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium text-emerald-700">#{order._id.slice(-8)}</span>
              <Badge variant={getStatusVariant(order.status)} className="ml-2">
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-600">Items:</span>
                {order.cart?.map((item, index) => (
                  <div key={index} className="ml-2 text-sm text-gray-600">
                    • {item.name} x {item.qty}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-600">Total:</span>
                  <p className="text-sm font-medium text-emerald-600">
                    ${order.totalPrice?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Date:</span>
                  <p className="text-sm">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Payment:</span>
                <p className="text-sm">{order.paymentInfo?.type}</p>
              </div>
              <Link to={`/user/order/${order._id}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full hover:bg-emerald-50 border-emerald-200"
                >
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  if (safeOrders.length === 0) {
    return (
      <Card className="w-full bg-gradient-to-b from-emerald-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-800">
            <ClipboardList className="w-6 h-6 mr-2 text-emerald-600" />
            My Orders
          </CardTitle>
        </CardHeader>
        <EmptyState />
      </Card>
    );
  }

  return (
    <div className="bg-gradient-to-b from-emerald-50/50">
      <CardHeader>
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle className="flex items-center text-emerald-800">
            <ClipboardList className="w-6 h-6 mr-2 text-emerald-600" />
            My Orders
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Orders per page:</span>
            <Select 
              value={ordersPerPage.toString()} 
              onValueChange={(value) => setOrdersPerPage(Number(value))}
            >
              <SelectTrigger className="w-[80px] border-emerald-200">
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
     
      <div className="hidden px-6 overflow-x-auto md:block">
        <div className="border rounded-lg border-emerald-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50/50">
                <TableHead className="text-emerald-700">Order ID</TableHead>
                <TableHead className="text-emerald-700">Items</TableHead>
                <TableHead className="text-emerald-700">Total Price</TableHead>
                <TableHead className="text-emerald-700">Payment</TableHead>
                <TableHead className="text-emerald-700">Date</TableHead>
                <TableHead className="text-emerald-700">Status</TableHead>
                <TableHead className="text-emerald-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order._id} className="hover:bg-emerald-50/50">
                  <TableCell className="font-medium text-emerald-700">
                    #{order._id.slice(-8)}
                  </TableCell>
                  <TableCell>
                    {order.cart?.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.name} x {item.qty}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="font-medium text-emerald-600">
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
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="hover:bg-emerald-50 border-emerald-200"
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
      </div>

      <div className="px-6">
        <MobileOrderView />
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between p-6 space-y-4 md:flex-row md:space-y-0">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-emerald-200"
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index} className="hidden sm:block">
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "bg-emerald-600" : "hover:bg-emerald-50"}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
    </div>
  );
};

export default AllOrders;