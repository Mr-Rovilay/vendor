import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import api from "@/utils/server";
import { loadSeller } from "@/redux/actions/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState();
  const [formData, setFormData] = useState({
    name: seller?.name || "",
    description: seller?.description || "",
    address: seller?.address || "",
    phoneNumber: seller?.phoneNumber || "",
    zipCode: seller?.zipCode || ""
  });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        updateAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const updateAvatar = async (avatarData) => {
    try {
      await api.put("/shop/update-shop-avatar", { avatar: avatarData });
      dispatch(loadSeller());
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/shop/update-seller-info", formData);
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Shop Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={avatar || seller?.avatar?.url}
              alt="Shop Avatar"
              className="object-cover w-48 h-48 border-4 border-green-200 rounded-full"
            />
            <div className="absolute bottom-2 right-2">
              <Label
                htmlFor="avatar-upload"
                className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <Camera className="w-5 h-5 text-gray-600" />
                <Input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                  accept="image/*"
                />
              </Label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Shop Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter shop name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter shop description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter shop address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Enter zip code"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
          >
            Update Shop
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShopSettings;