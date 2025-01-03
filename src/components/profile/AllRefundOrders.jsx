import { useEffect } from 'react';
import { RefreshCcw, PackageX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '@/redux/actions/orderActions';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Approved': return 'success';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <PackageX className="w-16 h-16 mb-4 text-gray-300" />
      <h3 className="mb-2 text-lg font-semibold text-gray-600">No Refund Orders</h3>
      <p className="max-w-sm text-gray-500">
        You don't have any refund orders at the moment. Refund requests will appear here when processed.
      </p>
    </div>
  );

  return (
    <Card className="w-full bg-gradient-to-b from-emerald-50/50">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <RefreshCcw className="w-6 h-6 mr-2 text-emerald-600" />
          Refund Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!eligibleOrders || eligibleOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Table for Medium and Larger Screens */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="border-b bg-emerald-50/50 border-emerald-200">
                    <th className="p-3 text-sm font-semibold text-left text-emerald-700">Refund ID</th>
                    <th className="p-3 text-sm font-semibold text-left text-emerald-700">Refund Amount</th>
                    <th className="p-3 text-sm font-semibold text-left text-emerald-700">Status</th>
                    <th className="p-3 text-sm font-semibold text-left text-emerald-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibleOrders.map((refund) => (
                    <tr key={refund._id} className="border-b border-emerald-100 hover:bg-emerald-50/50">
                      <td className="p-3 font-medium">{refund._id}</td>
                      <td className="flex items-center p-3 text-emerald-600">
                        ${refund.totalPrice}
                      </td>
                      <td className="p-3">
                        <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                      </td>
                      <td className="p-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="hover:bg-emerald-50 border-emerald-200"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Refund Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-2">
                                <strong>Refund ID:</strong>
                                <span>{refund._id}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <strong>Product:</strong>
                                <span>{refund.cart.length} items</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <strong>Refund Amount:</strong>
                                <span className="text-emerald-600">${refund.totalPrice}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <strong>Reason:</strong>
                                <span>{refund.reason}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <strong>Status:</strong>
                                <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile-Friendly List */}
            <div className="block space-y-4 md:hidden">
              {eligibleOrders.map((refund) => (
                <div 
                  key={refund._id} 
                  className="p-4 bg-white border rounded-lg shadow-sm border-emerald-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-emerald-700">ID: {refund._id}</span>
                    <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                  </div>
                  <div className="mb-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium text-emerald-600">${refund.totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Items:</span>
                      <span className="font-medium">{refund.cart.length}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full hover:bg-emerald-50 border-emerald-200"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Refund Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <strong>Refund ID:</strong>
                          <span>{refund._id}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <strong>Product:</strong>
                          <span>{refund.cart.length} items</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <strong>Refund Amount:</strong>
                          <span className="text-emerald-600">${refund.totalPrice}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <strong>Reason:</strong>
                          <span>{refund.reason}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <strong>Status:</strong>
                          <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AllRefundOrders;