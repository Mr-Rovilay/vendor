/* eslint-disable no-unused-vars */
import { createProduct } from "@/redux/actions/productAction";
import {  useState } from "react";
import { CirclePlus } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categoriesData } from "@/static/data";
import { Button } from "../ui/button";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const [loading, setLoading] = useState(false); // Loading state

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category changes
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`File ${file.name} is not an image.`);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 2MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          validFiles.push(reader.result);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category || !formData.discountPrice || !formData.stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    setLoading(true); // Start loading
    try {
      await dispatch(
        createProduct({
          ...formData,
          shopId: seller._id,
          images,
        })
      );
      toast.success("Product created successfully.");
      setFormData({
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
      });
      setImages([]);
      navigate("/dashboard");
      // window.location.reload();
    } catch (error) {
      toast.error("Failed to create product. Please try again.");
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container max-w-2xl p-3 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-center">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
        
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
            placeholder="Enter product description"
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
            placeholder="Enter tags (comma-separated)"
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
            <CirclePlus size={30} className="mt-1" />
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Preview"
                className="object-cover w-20 h-20 border rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </Button>

      </form>
    </div>
  );
};

export default CreateProduct;
