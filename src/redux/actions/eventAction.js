import api from "@/utils/server";


// create event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    const formData = new FormData();

      // Add basic product details
      formData.append("name", eventData.name);
      formData.append("description", eventData.description);
      formData.append("category", eventData.category);
      formData.append("tags", eventData.tags);
      formData.append("originalPrice", eventData.originalPrice);
      formData.append("discountPrice", eventData.discountPrice);
      formData.append("stock", eventData.stock);
      formData.append("shopId", eventData.shopId);
      formData.append("startDate", eventData.startDate);
      formData.append("endDate", eventData.endDate);

       // Handle images
    if (eventData.images) {
      eventData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const { data } = await api.post(`/event/create-event`, formData);
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await api.get(`/event/get-all-events/${id}`);
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await api.delete(
      `/event/delete-shop-event/${id}`);

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await api.get(`/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};