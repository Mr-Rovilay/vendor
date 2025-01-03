import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { CreditCard, ShoppingCartIcon as Paypal, Banknote, X } from 'lucide-react';
import { Input } from "../ui/input";


export const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center">
              <CreditCard className="mr-2" /> Pay with Debit/Credit Card
            </Label>
          </div>
          {paymentMethod === "card" && (
            <form onSubmit={paymentHandler} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder={user?.name} value={user?.name} readOnly />
                </div>
                <div>
                  <Label htmlFor="cardExpiry">Expiration Date</Label>
                  <CardExpiryElement
                    id="cardExpiry"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <CardNumberElement
                    id="cardNumber"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="cardCvc">CVC</Label>
                  <CardCvcElement
                    id="cardCvc"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Pay Now</Button>
            </form>
          )}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center">
              <Paypal className="mr-2" /> Pay with PayPal
            </Label>
          </div>
          {paymentMethod === "paypal" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Pay with PayPal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>PayPal Payment</DialogTitle>
                  <Button
                    variant="ghost"
                    className="absolute right-4 top-4"
                    onClick={() => setOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogHeader>
                <PayPalScriptProvider
                  options={{
                    "client-id": import.meta.env.PAYPAL_CLIENT_ID,
                     components: "buttons",
                   
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    onApprove={onApprove}
                    createOrder={createOrder}
                  />
                </PayPalScriptProvider>
              </DialogContent>
            </Dialog>
          )}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex items-center">
              <Banknote className="mr-2" /> Cash on Delivery
            </Label>
          </div>
          {paymentMethod === "cod" && (
            <form onSubmit={cashOnDeliveryHandler}>
              <Button type="submit" className="w-full">Confirm Cash on Delivery</Button>
            </form>
          )}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

