import { useState } from "react";
import { Trash2, Loader2, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { deleteUserAddress, updateUserAddress } from "@/redux/actions/user";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
    addressType: ""
  });

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const addresses = user?.addresses || [];
  const addressTypes = ["Default", "Home", "Office"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      country: "",
      city: "",
      address1: "",
      address2: "",
      zipCode: "",
      addressType: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { country, city, address1, zipCode, addressType } = formData;

    if (!country || !city || !address1 || !zipCode || !addressType) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          formData.address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      resetForm();
      toast.success("Address saved successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to save address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      setIsDeleting(true);
      await dispatch(deleteUserAddress(item._id));
      toast.success("Address deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to delete address");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-gray-500">Please log in to manage your addresses.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900 md:text-xl">
            <MapPin className="w-6 h-6 mr-2 text-emerald-600" />
            My Addresses
          </CardTitle>
          <Button 
            onClick={() => setOpen(true)}
            className="transition-colors bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Address
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.length > 0 ? (
            addresses.map((item) => (
              <div
                key={item._id}
                className="relative p-4 transition-all border rounded-lg hover:shadow-md group"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-medium rounded-full text-emerald-700 bg-emerald-100">
                      {item.addressType}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(item)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.address1}
                    {item.address2 && <span className="text-gray-600">, {item.address2}</span>}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.city}, {item.country}
                  </p>
                  <p className="text-sm text-gray-500">{item.zipCode}</p>
                  {user.phoneNumber && (
                    <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-gray-500">
              You don't have any saved addresses yet.
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">Add New Address</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <CountryDropdown
                value={formData.country}
                onChange={(value) => handleInputChange("country", value)}
                className="w-full p-2 text-sm border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <RegionDropdown
                country={formData.country}
                value={formData.city}
                onChange={(value) => handleInputChange("city", value)}
                className="w-full p-2 text-sm border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="123 Main Street"
                value={formData.address1}
                onChange={(e) => handleInputChange("address1", e.target.value)}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <Input
                placeholder="Apartment 4B"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="100001"
                type="text"
                pattern="[0-9]*"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Address Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 text-sm border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.addressType}
                onChange={(e) => handleInputChange("addressType", e.target.value)}
              >
                <option value="" disabled>
                  Choose Address Type
                </option>
                {addressTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </div>
              ) : (
                "Save Address"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Address;