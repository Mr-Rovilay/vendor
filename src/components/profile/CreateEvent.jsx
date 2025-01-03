import { createEvent } from "@/redux/actions/eventAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categoriesData } from "@/static/data";
import { Button } from "../ui/button";


const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { error, success } = useSelector((state) => state.events);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    startDate: "", // Changed from start_Date
    endDate: "", // Changed from finish_Date
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [error, success, navigate]);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setFormData((prev) => ({
      ...prev,
      startDate: date, // Changed from start_Date
    }));
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setFormData((prev) => ({
      ...prev,
      endDate: date, // Changed from finish_Date
    }));
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = formData.startDate
    ? new Date(new Date(formData.startDate).getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 2MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.discountPrice ||
      !formData.stock ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        ...formData,
        shopId: seller._id,
        images,
      };
      await dispatch(createEvent(eventData));
    } catch (error) {
      toast.error(error.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl p-6 mx-auto rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-center">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name">Event Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
           
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows={4}
            
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesData?.map((category) => (
                <SelectItem key={category.title} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Enter event tags (comma-separated)"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              id="originalPrice"
              name="originalPrice"
              type="number"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="Enter original price"
            />
          </div>
          <div>
            <Label htmlFor="discountPrice">Discount Price</Label>
            <Input
              id="discountPrice"
              name="discountPrice"
              type="number"
              value={formData.discountPrice}
              onChange={handleInputChange}
              placeholder="Enter discount price"
             
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
          
          />
        </div>

        {/* Event Dates */}
        <div>
          <Label htmlFor="startDate">Event Start Date</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleStartDateChange}
            min={today}
         
          />
        </div>

        <div>
          <Label htmlFor="endDate">Event End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleEndDateChange}
            min={minEndDate}
           
            disabled={!formData.startDate}
          />
        </div>

        {/* Images */}
        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="images" className="text-lg font-semibold">
              Upload Images
            </Label>
            <p className="text-sm text-gray-600">
              You can upload multiple images at once
            </p>
          </div>
          <input
            id="images"
            type="file"
            multiple
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="images" className="cursor-pointer">
            <AiOutlinePlusCircle size={30} className="mt-1" />
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index + 1}`}
                className="object-cover w-20 h-20 border rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
