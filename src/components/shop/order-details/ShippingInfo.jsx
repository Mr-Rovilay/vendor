import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, Building2, Globe2, MapPinned, Phone } from 'lucide-react';

export const ShippingInfo = ({ data }) => {
  const addressDetails = [
    { 
      icon: <Home className="w-4 h-4 text-green-600" />,
      label: "Address Line 1",
      value: data?.shippingAddress.address1 
    },
    { 
      icon: <Building2 className="w-4 h-4 text-green-600" />,
      label: "Address Line 2",
      value: data?.shippingAddress.address2 
    },
    { 
      icon: <Globe2 className="w-4 h-4 text-green-600" />,
      label: "Country",
      value: data?.shippingAddress.country 
    },
    { 
      icon: <MapPinned className="w-4 h-4 text-green-600" />,
      label: "City",
      value: data?.shippingAddress.city 
    },
    { 
      icon: <Phone className="w-4 h-4 text-green-600" />,
      label: "Phone",
      value: data?.user?.phoneNumber 
    }
  ];

  return (
    <Card className="overflow-hidden border-green-100 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
        <CardTitle className="flex items-center text-lg font-semibold text-green-800">
          <MapPin className="w-5 h-5 mr-2 text-green-600" /> 
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {addressDetails.map((detail, index) => (
          detail.value && (
            <div 
              key={index} 
              className="flex items-start space-x-3 group"
            >
              <div className="mt-1 transform transition-transform duration-300 group-hover:scale-110">
                {detail.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
                <p className="text-gray-700 font-medium">{detail.value}</p>
              </div>
            </div>
          )
        ))}
      </CardContent>
    </Card>
  );
};

export default ShippingInfo;