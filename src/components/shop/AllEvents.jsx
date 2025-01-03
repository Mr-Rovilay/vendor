import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteEvent, getAllEventsShop } from "@/redux/actions/eventAction";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";


const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvent(id));
      toast.success("Event deleted successfully");
      dispatch(getAllEventsShop(seller._id)); // Refresh the list
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[450px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto ">
      <CardHeader>
        <CardTitle className="font-bold">All Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event._id}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>US$ {event.discountPrice}</TableCell>
                  <TableCell>{event.stock}</TableCell>
                  <TableCell>{event.sold_out || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/product/${event.name.replace(/\s+/g, "-")}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(event._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {events?.length === 0 && (
          <div className="flex items-center justify-center h-24 text-muted-foreground">
            No events found
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default AllEvents;