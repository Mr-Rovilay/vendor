import { getAllOrdersOfUser } from '@/redux/actions/orderActions';
import api from '@/utils/server';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';


const ReviewDialog = ({ open, setOpen, selectedItem, userId, orderId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const reviewHandler = async () => {
    try {
      const res = await api.put(
        `/product/create-new-review`,
        {
          user: userId,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId,
        },
      );
      toast.success(res.data.message);
      dispatch(getAllOrdersOfUser(userId));
      setComment("");
      setRating(1);
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src={selectedItem?.images[0]?.url}
              alt={selectedItem?.name}
              className="object-cover w-16 h-16 rounded"
            />
            <div>
              <h5 className="font-medium">{selectedItem?.name}</h5>
              <p className="text-muted-foreground">
                US${selectedItem?.discountPrice} x {selectedItem?.qty}
              </p>
            </div>
          </div>
          <div>
            <h5 className="mb-2 font-medium">Rating</h5>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`cursor-pointer ${i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
          </div>
          <div>
            <h5 className="mb-2 font-medium">Comment (optional)</h5>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your product? Write your expression about it!"
            />
          </div>
          <Button onClick={reviewHandler} disabled={rating < 1}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;  

