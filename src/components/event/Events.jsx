import { getAllEvents } from "@/redux/actions/eventAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, CardTitle } from "../ui/card";
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
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
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
            <div className="relative">
              {/* Horizontal Scrollable Container */}
              <div className="flex gap-6 overflow-x-scroll lg:overflow-hidden snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-emerald-100">
                {popularEvents.map((event) => (
                  <div
                    key={event._id}
                    className="min-w-[100%] md:min-w-[33%] snap-center"
                  >
                    <EventCard data={event} />
                  </div>
                ))}
              </div>
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
