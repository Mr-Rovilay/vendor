import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";



export function CartData({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold">${subTotalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping:</span>
            <span className="font-semibold">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pb-2 border-b">
            <span className="text-muted-foreground">Discount:</span>
            <span className="font-semibold">
              {discountPercentage ? `- $${discountPercentage.toFixed(2)}` : "-"}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${totalPrice}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <Input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" className="w-full">
            Apply Coupon
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

