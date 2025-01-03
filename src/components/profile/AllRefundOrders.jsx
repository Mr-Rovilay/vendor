import { useEffect } from 'react';
import { RefreshCcw} from 'lucide-react';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCcw className="w-6 h-6 mr-2" />
          Refund Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Table for Medium and Larger Screens */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-sm font-semibold text-left">Refund ID</th>
                <th className="p-3 text-sm font-semibold text-left">Refund Amount</th>
                <th className="p-3 text-sm font-semibold text-left">Status</th>
                <th className="p-3 text-sm font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eligibleOrders.map((refund) => (
                <tr key={refund.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{refund._id}</td>
                  <td className="flex items-center p-3">
                    ${refund.totalPrice}
                  </td>
                  <td className="p-3">
                    <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                  </td>
                  <td className="p-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Refund Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div><strong>Refund ID:</strong> {refund._id}</div>
                          <div><strong>Product:</strong> {refund.cart.length}</div>
                          <div><strong>Refund Amount:</strong> ${refund.totalPrice}</div>
                          <div><strong>Reason:</strong> {refund.reason}</div>
                          <div>
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
        <div className="block md:hidden">
          {eligibleOrders.map((refund) => (
            <div key={refund.id} className="p-4 mb-4 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <strong>Refund ID:</strong>
                <span>{refund.id}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Refund Amount:</strong>
                <div className="flex items-center">
                ${refund.totalPrice}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <strong>Status:</strong>
                <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refund Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div><strong>Refund ID:</strong> {refund.id}</div>
                    <div><strong>Product:</strong> {refund.cart.length}</div>
                    <div><strong>Refund Amount:</strong> ${refund.totalPrice}</div>
                    <div><strong>Reason:</strong> {refund.reason}</div>
                    <div>
                      <strong>Status:</strong> 
                      <Badge variant={getStatusVariant(refund.status)}>{refund.status}</Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllRefundOrders;
