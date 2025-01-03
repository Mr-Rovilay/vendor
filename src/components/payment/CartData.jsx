import { ShoppingCart, Truck, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="mr-2" />
            <span className="text-sm text-muted-foreground">Subtotal:</span>
          </div>
          <span className="font-semibold">${orderData?.subTotalPrice}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Truck className="mr-2" />
            <span className="text-sm text-muted-foreground">Shipping:</span>
          </div>
          <span className="font-semibold">${shipping}</span>
        </div>
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center">
            <Percent className="mr-2" />
            <span className="text-sm text-muted-foreground">Discount:</span>
          </div>
          <span className="font-semibold">
            {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">Total:</span>
          <span className="text-lg font-semibold">${orderData?.totalPrice}</span>
        </div>
      </CardContent>
    </Card>
  );
};

