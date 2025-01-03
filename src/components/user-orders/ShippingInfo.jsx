import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const ShippingInfo = ({ data }) => {
  if (!data?.shippingAddress) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
            <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-500">No shipping address available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
          <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          {data.shippingAddress.address1 && (
            <p className="text-sm font-medium text-gray-900">
              {data.shippingAddress.address1}
            </p>
          )}
          {data.shippingAddress.address2 && (
            <p className="text-sm text-gray-600">
              {data.shippingAddress.address2}
            </p>
          )}
          <div className="text-sm text-gray-600">
            {data.shippingAddress.city && data.shippingAddress.country && (
              <p>
                {data.shippingAddress.city}, {data.shippingAddress.country}
              </p>
            )}
          </div>
          {data?.user?.phoneNumber && (
            <p className="text-sm text-gray-500">
              {data.user.phoneNumber}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};