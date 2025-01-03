import { getAllEvents } from "@/redux/actions/eventAction";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import EventCard from "./EventCard";

const Events = () => {
  const dispatch = useDispatch();
  const [popularEvents, setPopularEvents] = useState([]);
  const { allEvents, isLoading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (allEvents && allEvents.length > 0) {
      const sortedData = [...allEvents].sort(
        (a, b) => b.sold_out - a.sold_out
      );
      const firstFive = sortedData.slice(0, 3);
      setPopularEvents(firstFive);
    }
  }, [allEvents]);

  if (error) {
    return (
      <div className="py-10 text-center max-pad-container">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-pad-container bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="mb-8">
        <CardTitle className="text-3xl font-bold text-center">
          Popular Events
        </CardTitle>
        <CardDescription className="font-bold text-center">
          Discover exciting products and limited-time offers
        </CardDescription>
      </CardHeader>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2/>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allEvents && allEvents.length > 0 ? (
            allEvents.map((event) => (
              <EventCard 
                key={event._id}
                data={event}
              />
            ))
          ) : (
            <div className="py-10 text-center col-span-full">
              <h4 className="text-lg text-gray-600">
                No events available at the moment
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                Check back later for exciting new events
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;