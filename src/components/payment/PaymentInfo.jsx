import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { CreditCard, ShoppingCartIcon as Paypal, Banknote, X, Loader2 } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await paymentHandler(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await cashOnDeliveryHandler(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalApprove = async (...args) => {
    setIsProcessing(true);
    try {
      await onApprove(...args);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod} 
          className="space-y-4"
          disabled={isProcessing}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" disabled={isProcessing} />
            <Label htmlFor="card" className="flex items-center">
              <CreditCard className="mr-2" /> Pay with Debit/Credit Card
            </Label>
          </div>
          {paymentMethod === "card" && (
            <form onSubmit={handleCardPayment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    placeholder={user?.name} 
                    value={user?.name} 
                    readOnly 
                    disabled={isProcessing}
                  />
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
                    disabled={isProcessing}
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
                    disabled={isProcessing}
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
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </form>
          )}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" disabled={isProcessing} />
            <Label htmlFor="paypal" className="flex items-center">
              <Paypal className="mr-2" /> Pay with PayPal
            </Label>
          </div>
          {paymentMethod === "paypal" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay with PayPal'
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>PayPal Payment</DialogTitle>
                  <Button
                    variant="ghost"
                    className="absolute right-4 top-4"
                    onClick={() => setOpen(false)}
                    disabled={isProcessing}
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
                    onApprove={handlePayPalApprove}
                    createOrder={createOrder}
                    disabled={isProcessing}
                  />
                </PayPalScriptProvider>
              </DialogContent>
            </Dialog>
          )}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" disabled={isProcessing} />
            <Label htmlFor="cod" className="flex items-center">
              <Banknote className="mr-2" /> Cash on Delivery
            </Label>
          </div>
          {paymentMethod === "cod" && (
            <form onSubmit={handleCashOnDelivery}>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  'Confirm Cash on Delivery'
                )}
              </Button>
            </form>
          )}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};