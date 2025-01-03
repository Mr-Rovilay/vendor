import { MapPin, Phone, Mail, User, Home, Building} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
export function ShippingInfo({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {user?.addresses?.length > 0 && (
          <div className="mb-8">
            <button
              className="flex items-center gap-2 mb-4 font-medium text-blue-600 hover:text-blue-700"
              onClick={() => setUserInfo(!userInfo)}
            >
              <Home className="w-4 h-4" />
              {userInfo ? "Enter new address" : "Choose from saved addresses"}
            </button>

            {userInfo && (
              <RadioGroup className="gap-4">
                {user.addresses.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 space-x-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setAddress1(item.address1);
                      setAddress2(item.address2);
                      setZipCode(item.zipCode);
                      setCountry(item.country);
                      setCity(item.city);
                    }}
                  >
                    <RadioGroupItem value={index.toString()} id={`address-${index}`} />
                    <div className="flex-1">
                      <Label htmlFor={`address-${index}`} className="font-medium">
                        {item.addressType}
                      </Label>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.address1}
                        {item.address2 && `, ${item.address2}`}
                        <br />
                        {item.city}, {item.country} {item.zipCode}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        )}

        {!userInfo && (
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </Label>
                <Input id="fullName" value={user?.name} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </Label>
                <Input id="email" type="email" value={user?.email} readOnly className="bg-gray-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </Label>
                <Input id="phoneNumber" type="tel" value={user?.phoneNumber} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  type="number"
                  value={zipCode || ""}
                  onChange={(e) => setZipCode(parseInt(e.target.value) || null)}
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <CountryDropdown
                  value={country}
                  onChange={(val) => setCountry(val)}
                  className="w-full p-2 border rounded-md cursor-pointer border-input bg-background"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="city">City/Region</Label>
                <RegionDropdown
                  country={country}
                  value={city}
                  onChange={(val) => setCity(val)}
                  className="w-full p-2 border rounded-md cursor-pointer border-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="address1" className="flex items-center gap-2">
                  <Home className="w-4 h-4" /> Address Line 1
                </Label>
                <Input
                  id="address1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="Street address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2" className="flex items-center gap-2">
                  <Building className="w-4 h-4" /> Address Line 2
                </Label>
                <Input
                  id="address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default ShippingInfo;