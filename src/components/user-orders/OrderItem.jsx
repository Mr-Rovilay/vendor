import { Button } from "../ui/button";


export const OrderItem = ({ item, orderStatus, onReviewClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={item.images[0]?.url}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h5 className="font-medium">{item.name}</h5>
          <p className="text-muted-foreground">
            US${item.discountPrice} x {item.qty}
          </p>
        </div>
      </div>
      {!item.isReviewed && orderStatus === "Delivered" && (
        <Button variant="outline" onClick={onReviewClick}>
          Write a review
        </Button>
      )}
    </div>
  );
};

