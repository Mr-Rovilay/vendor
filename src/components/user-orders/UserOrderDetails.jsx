import { getAllOrdersOfUser } from '@/redux/actions/orderActions';
import api from '@/utils/server';
import { Package, MessageSquare } from 'lucide-react';
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Package className="mr-2" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <p className="text-muted-foreground">
            Order ID: <span className="font-medium">#{data?._id?.slice(0, 8)}</span>
          </p>
          <p className="text-muted-foreground">
            Placed on: <span className="font-medium">{data?.createdAt?.slice(0, 10)}</span>
          </p>
        </div>

        <div className="mb-6 space-y-4">
          {data?.cart.map((item, index) => (
            <OrderItem 
              key={index} 
              item={item} 
              orderStatus={data?.status}
              onReviewClick={() => {
                setSelectedItem(item);
                setOpen(true);
              }}
            />
          ))}
        </div>

        <div className="pt-4 mb-6 text-right border-t">
          <p className="text-lg">
            Total Price: <strong>US${data?.totalPrice}</strong>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ShippingInfo data={data} />
          <PaymentInfo 
            data={data} 
            showRefundButton={data?.status === "Delivered"}
            onRefundClick={refundHandler}
          />
        </div>

        <div className="flex justify-between mt-6">
          <Link to="/">
            <Button>
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
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

