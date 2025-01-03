import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const ShippingInfo = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <MapPin className="w-4 h-4 mr-2" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data?.shippingAddress.address1}</p>
        <p>{data?.shippingAddress.address2}</p>
        <p>{data?.shippingAddress.country}</p>
        <p>{data?.shippingAddress.city}</p>
        <p>{data?.user?.phoneNumber}</p>
      </CardContent>
    </Card>
  );
};

