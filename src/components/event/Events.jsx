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
      const sortedData = [...allEvents].sort((a, b) => b.sold_out - a.sold_out);
      const firstThree = sortedData.slice(0, 3);
      setPopularEvents(firstThree);
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
    <div className="max-pad-container bg-gradient-to-br from-emerald-50 to-white">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-10 h-10 text-gray-700 animate-spin" />
        </div>
      ) : (
        <>
          <CardHeader className="mb-8">
            <CardTitle className="text-3xl font-bold text-center">
              Popular Events
              <div className="w-20 h-1 mx-auto mt-2 rounded bg-emerald-500"></div>
            </CardTitle>
            <p className="font-bold text-center">
              Discover exciting products and limited-time offers
            </p>
          </CardHeader>

          {popularEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularEvents.map((event) => (
                <EventCard key={event._id} data={event} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <h4 className="text-lg text-gray-600">No events available</h4>
              <p className="mt-2 text-sm text-gray-500">
                Check back later for exciting new events
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
