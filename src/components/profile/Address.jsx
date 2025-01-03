import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { deleteUserAddress, updateUserAddress } from "@/redux/actions/user";
import { Card } from "../ui/card";
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
      <Card className="container px-4 py-10 mx-auto">
        <p className="text-center text-gray-500">Please log in to manage your addresses.</p>
      </Card>
    );
  }

  return (
    <Card className="container px-4 py-10 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Addresses</h1>
        <Button onClick={() => setOpen(true)}>Add New</Button>
      </div>

      <div className="mt-6 space-y-4">
  {addresses.length > 0 ? (
    addresses.map((item) => (
      <div
        key={item._id}
        className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50"
      >
        <div className="flex flex-col space-y-1">
          <h4 className="text-lg font-semibold text-gray-700">
            {item.addressType}
          </h4>
          <p className="text-sm text-gray-600">
            {item.address1}
            {item.address2 ? `, ${item.address2}` : ""}
          </p>
          <p className="text-sm text-gray-600">
            {item.city}, {item.country}
          </p>
          <p className="text-sm text-gray-500">{user.phoneNumber}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={() => handleDelete(item)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 />
          )}
        </Button>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">
      You do not have any saved addresses!
    </p>
  )}
</div>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1">Country <span className="text-red-500">*</span></label>
              <CountryDropdown
                value={formData.country}
                onChange={(value) => handleInputChange("country", value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">City <span className="text-red-500">*</span></label>
              <RegionDropdown
                country={formData.country}
                value={formData.city}
                onChange={(value) => handleInputChange("city", value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Address Line 1 <span className="text-red-500">*</span></label>
              <Input
                placeholder="123 Main Street"
                value={formData.address1}
                onChange={(e) => handleInputChange("address1", e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Address Line 2</label>
              <Input
                placeholder="Apartment 4B"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Zip Code <span className="text-red-500">*</span></label>
              <Input
                placeholder="100001"
                type="text"
                pattern="[0-9]*"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">Address Type <span className="text-red-500">*</span></label>
              <select
                className="w-full p-2 border rounded"
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
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Saving...
                </>
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
