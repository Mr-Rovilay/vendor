import { loadUser, updateUserInformation } from "@/redux/actions/user";
import { profileSchema } from "@/zod-schema/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import PaymentMethods from "./PaymentMethods";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import TrackUserOrder from "./TrackUserOrder";
import AllRefundOrders from "./AllRefundOrders";
import AllOrders from "./AllOrders";


const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  // State management
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form initialization
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      // password: "",
    },
  });

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        await dispatch(loadUser());
      } finally {
        setIsLoadingUser(false);
      }
    };
    loadUserData();
  }, [dispatch]);

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        // password: "",
      });
    }
  }, [user, form]);

  // Handle errors and success messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  // Handle image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle avatar update
  const handleAvatarUpdate = async () => {
    if (!avatar) return;
    
    setIsUpdatingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      
      await api.put('/auth/update-avatar', formData);
      
      await dispatch(loadUser());
      toast.success("Avatar updated successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await dispatch(updateUserInformation(
        formData.name,
        formData.email,
        formData.phoneNumber
        // formData.password
      ));
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        // navigate('/login');
      } else {
        toast.error(error.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const renderActiveContent = () => {
    switch (active) {
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6 space-y-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer group">
                      <Avatar className="w-[150px] h-[150px] border-4 border-primary/50 group-hover:opacity-70 transition-opacity">
                        <AvatarImage
                          src={user?.avatar?.url}
                          alt="Profile avatar"
                          className="object-cover rounded-full"
                        />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <Camera className="w-8 h-8 text-stone-300" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {avatarPreview && (
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-center">
                            <img
                              src={avatarPreview}
                              alt="Avatar Preview"
                              className="max-w-[300px] max-h-[300px] object-contain"
                            />
                          </div>
                          <Button 
                            onClick={handleAvatarUpdate}
                            disabled={isUpdatingAvatar || !avatar}
                          >
                            {isUpdatingAvatar ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              "Save Avatar"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter phone number"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter new password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
      case 2:
        return <AllOrders />;
      case 3:
        return <AllRefundOrders />;
      case 5:
        return <TrackUserOrder />;
      case 6:
        return <ChangePassword />;
      case 7:
        return <Address />;
      case 8:
        return <PaymentMethods />;
      default:
        return null;
    }
  };

  return <div className="w-full">{renderActiveContent()}</div>;
};

export default ProfileContent;