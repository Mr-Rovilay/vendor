import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import { passwordSchema } from "@/zod-schema/zod";
import api from "@/utils/server";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";




const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    const formData = { oldPassword, newPassword, confirmPassword };

    // Validate with Zod
    const validation = passwordSchema.safeParse(formData);
    if (!validation.success) {
      const errorMessage = validation.error.errors[0].message;
      toast.error(errorMessage);
      return;
    }

    try {
      const res = await api.put(`/auth/update-user-password`, formData);
      toast.success(res.data.success);
      toast.success(("password updated successfully"))
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

  return (
    <Card className="max-w-lg p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold text-center">
        Change Password
      </h2>
      <form onSubmit={passwordChangeHandler} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="old-password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Old Password
          </Label>
          <Input
            id="old-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            New Password
          </Label>
          <Input
            id="new-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          type="button"
          variant="link"
          className="flex items-center justify-end gap-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showPassword ? "Hide Passwords" : "Show Passwords"}
        </Button>

        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>
    </Card>
  );
};

export default ChangePassword;
