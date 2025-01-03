import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus } from "lucide-react";
import api from "@/utils/server";
import { toast } from "sonner";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState("");

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/coupon/get-coupon/${seller._id}`);
        setCoupons(res.data.couponCodes);
      } catch (error) {
        toast.error("Failed to fetch coupons");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoupons();
  }, [seller._id], [dispatch]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/coupon/delete-coupon/${id}`);
      toast.success("Coupon deleted successfully!");
      setCoupons(coupons.filter(coupon => coupon._id !== id));
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        }
      );
      toast.success("Coupon created successfully!");
      setOpen(false);
      // Refresh coupons list
      const res = await api.get(`/coupon/get-coupon/${seller._id}`);
      setCoupons(res.data.couponCodes);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create coupon");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[450px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Coupon Management</h2>
          <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Coupon
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coupon ID</TableHead>
              <TableHead>Coupon Code</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell className="font-medium">{coupon._id}</TableCell>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>{coupon.value}%</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(coupon._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Coupon Code</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter coupon code name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  Discount Percentage <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter discount percentage"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minAmount">Min Amount</Label>
                <Input
                  id="minAmount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Enter minimum amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAmount">Max Amount</Label>
                <Input
                  id="maxAmount"
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Enter maximum amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Selected Product</Label>
                <Select value={selectedProducts} onValueChange={setSelectedProducts}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map((product) => (
                      <SelectItem key={product.name} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Create Coupon
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </div>
  );
};

export default AllCoupons;