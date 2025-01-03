import { getAllOrdersOfUser } from '@/redux/actions/orderActions';
import api from '@/utils/server';
import { Package, MessageSquare, Clock, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { OrderItem } from './OrderItem';
import { ShippingInfo } from './ShippingInfo';
import { PaymentInfo } from './PaymentInfo';
import { Button } from '../ui/button';
import ReviewDialog from './ReviewDialog';

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const refundHandler = async () => {
    try {
      const res = await api.put(`/order/order-refund/${id}`, {
        status: "Processing refund"
      });
      toast.success(res.data.message);
      dispatch(getAllOrdersOfUser(user._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!data) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-gray-500">Order not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900 md:text-xl">
          <Package className="w-6 h-6 mr-2 text-emerald-600" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 p-4 mb-6 rounded-lg bg-gray-50 md:grid-cols-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              Order ID:
            </div>
            <span className="font-medium text-gray-900">
              #{data._id?.slice(0, 8)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              Placed on:
            </div>
            <span className="font-medium text-gray-900">
              {data.createdAt?.slice(0, 10)}
            </span>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          {data.cart.map((item, index) => (
            <OrderItem 
              key={index} 
              item={item} 
              orderStatus={data.status}
              onReviewClick={() => {
                setSelectedItem(item);
                setOpen(true);
              }}
            />
          ))}
        </div>

        <div className="flex justify-end p-4 mb-6 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-600">Total Price:</span>
            <span className="text-lg font-semibold text-emerald-600">
              US${data.totalPrice}
            </span>
          </div>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <ShippingInfo data={data} />
          <PaymentInfo 
            data={data} 
            showRefundButton={data.status === "Delivered"}
            onRefundClick={refundHandler}
          />
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <Link to="/">
            <Button 
              variant="outline" 
              className="transition-colors hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </Link>
        </div>
      </CardContent>

      <ReviewDialog
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
        userId={user._id}
        orderId={id}
      />
    </Card>
  );
};

export default UserOrderDetails;