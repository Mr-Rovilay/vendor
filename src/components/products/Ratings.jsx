/* eslint-disable react/prop-types */
import { Star, StarHalf, StarOff } from "lucide-react";

const Ratings = ({ rating }) => {
  const stars = [];

  // Loop to create the star elements based on rating
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star
          key={i}
          size={20}
          color="#f6b100"
          className="mr-1 text-yellow-400 transition-transform transform cursor-pointer fill-current hover:scale-110"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalf
          key={i}
          size={20}
          color="#f6b100"
          className="mr-1 transition-transform transform cursor-pointer hover:scale-110"
        />
      );
    } else {
      stars.push(
        <StarOff 
          key={i}
          size={20}
          color="#dcdcdc"
          className="mr-1 transition-transform transform cursor-pointer hover:scale-110"
        />
      );
    }
  }

  return (
    <div className="flex items-center">
      {stars}
    </div>
  );
};

export default Ratings;
