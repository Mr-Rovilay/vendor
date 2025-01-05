import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Banknote,
  Building2,
  CircleDollarSign,
  CreditCard,
  Globe,
  MapPin,
  Trash2,
  UserCircle,
} from "lucide-react";
import { getAllOrdersOfShop } from "@/redux/actions/orderActions";
import api from "@/utils/server";
import { toast } from "sonner";
import { loadSeller } from "@/redux/actions/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const { orders = [] } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  useEffect(() => {
    // Update delivered orders whenever orders change
    const orderData = orders.filter((item) => item.status === "Delivered");
    setDeliveredOrders(orderData);
  }, [orders]);

  // Calculate totals
  const totalEarning = deliveredOrders.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const serviceCharge = totalEarning * 0.1;
  const availableBalance = (totalEarning - serviceCharge).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawMethod = { ...bankInfo };
    setPaymentMethod(false);

    try {
      await api.put('/shop/update-payment-methods', { withdrawMethod });
      toast.success("Withdraw method added successfully!");
      dispatch(loadSeller());
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: null,
        bankAccountNumber: null,
        bankHolderName: "",
        bankAddress: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async () => {
    try {
      await api.delete('/shop/delete-withdraw-method');
      toast.success("Withdraw method deleted successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error("Failed to delete withdraw method");
    }
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("Invalid withdrawal amount!");
      return;
    }

    try {
      await api.post('/withdraw/create-withdraw-request', { amount: withdrawAmount });
      toast.success("Withdrawal request submitted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to process withdrawal");
    }
  };

  return (
    <div className="p-3 h-[90vh] bg-gray-50">
      <div className="flex items-center justify-center w-full h-full bg-white">
        <div className="space-y-6 text-center">
          <CircleDollarSign className="w-16 h-16 mx-auto text-green-500" />
          <div>
            <CardTitle className="mb-2 text-3xl font-bold">
              Available Balance
            </CardTitle>
            <p className="text-4xl font-bold text-green-500">
              ${availableBalance}
            </p>
          </div>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => availableBalance >= 50 ? setOpen(true) : toast.error("Insufficient balance!")}
          >
            <Banknote className="mr-2" /> Withdraw Funds
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {paymentMethod ? "Add Withdrawal Method" : "Withdraw Funds"}
            </DialogTitle>
          </DialogHeader>

          {paymentMethod ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <div className="relative">
                    <Building2 className="absolute text-gray-400 left-3 top-3" />
                    <Input
                      className="pl-10"
                      placeholder="Enter bank name"
                      value={bankInfo.bankName}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bank Country</Label>
                  <div className="relative">
                    <Globe className="absolute text-gray-400 left-3 top-3" />
                    <Input
                      className="pl-10"
                      placeholder="Enter bank country"
                      value={bankInfo.bankCountry}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankCountry: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Swift Code</Label>
                  <div className="relative">
                    <CreditCard className="absolute text-gray-400 left-3 top-3" />
                    <Input
                      className="pl-10"
                      placeholder="Enter SWIFT code"
                      value={bankInfo.bankSwiftCode || ""}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankSwiftCode: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute text-gray-400 left-3 top-3" />
                    <Input
                      className="pl-10"
                      type="number"
                      placeholder="Enter account number"
                      value={bankInfo.bankAccountNumber || ""}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankAccountNumber: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Account Holder Name</Label>
                  <div className="relative">
                    <UserCircle className="absolute text-gray-400 left-3 top-3" />
                    <Input
                      className="pl-10"
                      placeholder="Enter account holder name"
                      value={bankInfo.bankHolderName}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankHolderName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bank Address</Label>
                  <div className="relative">
                    <MapPin className="absolute text-gray-400 left-3 top-3" />
                    <Input
                      className="pl-10"
                      placeholder="Enter bank address"
                      value={bankInfo.bankAddress}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankAddress: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                Add Withdrawal Method
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              {seller?.withdrawMethod ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Withdrawal Method</CardTitle>
                      <CardDescription>Your bank account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Account Number</p>
                          <p>{"*".repeat(seller.withdrawMethod.bankAccountNumber.length - 3) + 
                            seller.withdrawMethod.bankAccountNumber.slice(-3)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bank Name</p>
                          <p>{seller.withdrawMethod.bankName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={deleteHandler}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="max-w-[200px]"
                    />
                    <Button
                      onClick={withdrawHandler}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Banknote className="mr-2" /> Withdraw
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <p className="text-gray-500">No withdrawal method set up yet</p>
                  <Button
                    onClick={() => setPaymentMethod(true)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Add New Withdrawal Method
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawMoney;